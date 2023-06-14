const express = require('express');
const router = express.Router();
const { Review, ReviewImage, Spot, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { ValidationError } = require('sequelize');



// ROUTE FOR GETTING ALL REVIEWS BY A CURRENT USER
router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId; // Extract userId from the request parameters

    // Find all reviews by this user
    const reviews = await Review.findAll({
        where: {
            userId: userId,
        },
        include: [{ model: Spot, as: 'spot' }, { model: ReviewImage, as: 'images' }]
    });

    // Respond with the reviews
    res.json({ Reviews: reviews });
});


// ROUTE FOR GETTING ALL REVIEWS BY A SPOTS ID
router.get('/spot/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId; // Extract spotId from the request parameters

    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        res.status(404).json({ message: "Spot couldn't be found" });
        return;
    }

    // Find all reviews for this spot
    const reviews = await Review.findAll ({
        where: {
            spotId: spotId,
        },
        include: [{ model: User, as: 'user'}, { model: ReviewImage, as: 'images'}]
    });

    // Respond with the reviews
    res.json({ Reviews: reviews });
});



// ROUTE TO CREATE A REVIEW FOR A SPOT BASED ON THE SPOTS ID
router.post('/spot/:spotId', requireAuth, [
    check('review', 'Review text is required').exists(),
    check('stars', 'Stars must be an integer from 1 to 5').isInt({ min: 1, max: 5 }),
], handleValidationErrors, async (req, res, next) => {

try {

    const spotId = req.params.spotId // Extract spotId from the request parameters
    const { review, stars } = req.body; // Extract review and starts from the request body

    // check if spot exists
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404).json({ message: "Spot couldn't be found" });
        return;
    }

    // check if user already reviewed this spot
    const userReview = await Review.findOne({
        where: {
            userId: req.user.id, // contains authenticated user
            spotId: spotId
        }
    });

    if (userReview) {
        res.status(500).json({ "message": "User already has a review for this spot" });
        return;
    }

    // create the new review
    const newReview = await Review.create({
        userId: req.user.id, // contains authenticated user
        spotId: spotId,
        review: review,
        stars: stars,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    // respond with the new review
    res.status(201).json(newReview);

} catch (error) {
    if (error instanceof ValidationError) {
        let errors = {};
        for (let errorItem of error.errors) {
            errors[errorItem.path] = errorItem.message;
        }
        res.status(400).json({ message: "Validation error", errors: errors });
        }
    }

});


// ROUTE TO ADD AN IMAGE TO A REVIEW BASED ON THE REVIEW'S ID
router.post('/:reviewId/images', requireAuth,
    check('url', 'Image URL is required').exists(),
    handleValidationErrors, async (req, res, next) => {

        const { reviewId } = req.params;
        const { url } = req.body;

        // Get the review
        const review = await Review.findByPk(reviewId);

        if(!review) {
            return res.status(404).json({ message: "Review couldn't be found" });
        }

        // Check if review belongs to the current user
        if (req.user.id !== review.userId) {
            return res.status(403).json({ message: "Not authorized" });
        }

        // Check if number of images for the review is not more than the maximum allowed
        const reviewImages = await ReviewImage.findAll({ where: { reviewId: review.id }});
        if (reviewImages.length > 10) {
            return res.status(403).json({ message: "Maximum number of images for this resource was reached" })
        }

        // Create new image
        const newImage = await ReviewImage.create ({
            reviewId: review.id,
            url: url
        });


        // Respond w the new image
        res.status(200).json(newImage);
    });




    // ROUTE FOR EDITING A REVIEW
router.put('/:reviewId', requireAuth,[
    check('review', 'Review text is required').exists(),
    check('stars', 'Stars must be an integer from 1 to 5').isInt({ min: 1, max: 5 }),
],
handleValidationErrors, async (req, res, next) => {

    const { reviewId } = req.params;
    const { review, stars } = req.body;

    // Get the review
    const reviewToUpdate = await Review.findByPk(reviewId);

    if (!reviewToUpdate) {
        return res.status(404).json({ message: "Review couldn't be found" });
    }

     // Check if the review belongs to the current user
     if (req.user.id !== reviewToUpdate.userId) {
        return res.status(403).json({ message: "You are not authorized to modify this review" });
    }

    // Update the review
    await reviewToUpdate.update({
        review: review,
        stars: stars
    });

    // Respond with the updated review
    res.status(200).json(reviewToUpdate);

});



// ROUTE FOR DELETING A REVIEW
router.delete('/:reviewId', requireAuth, async (req, res, next) => {

    const { reviewId } = req.params;

    // Get the review
    const reviewToDelete = await Review.findByPk(reviewId);

    if (!reviewToDelete) {
        return res.status(404).json({ message: "Review couldn't be found" });
    }

    // Check if the review belongs to the current user
    if (req.user.id !== reviewToDelete.userId) {
        return res.status(403).json({ message: "You are not authorized to delete this review" });
    }

    // Delete the review
    await reviewToDelete.destroy();

    // Respond with success message
    res.status(200).json({ message: "Successfully deleted" });

});

    module.exports = router;
