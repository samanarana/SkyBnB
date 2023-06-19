const express = require('express');
const { Spot, SpotImage, Review, User, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
//const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



// ROUTE TO ADD AN IMAGE TO A SPOT BASED ON THE SPOT ID
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body;
    const spotId = req.params.spotId;  // It should be spotId
    const userId = req.user.id;

    if (!url || typeof preview !== 'boolean') {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                "url": "Url is required",
                "preview": "Preview should be true or false"
            }
        });
    }

    const spot = await Spot.findOne({  // It should be Spot, not Review
        where: {
            id: spotId,
            owner_id: userId
        }
    });

    if (!spot) {  // If the spot doesn't exist
        return res.status(404).json({ message: "Spot couldn't be found or user does not own the spot." });
    }

    const newImage = await SpotImage.create({ spot_id: spotId, url, preview });

    res.json(newImage);
});



// ROUTE TO CREATE A REVIEW FOR A SPOT BASED ON THE SPOTS ID
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    try {
      const spotId = parseInt(req.params.spotId, 10); // Extract spotId from the request parameters
      const { review, stars } = req.body; // Extract review and stars from the request body

      // Check if spot exists
      const spot = await Spot.findByPk(spotId);
      if (!spot) {
        res.status(404).json({ message: "Spot couldn't be found" });
        return;
      }

      // Check if user already reviewed this spot
      const userReview = await Review.findOne({
        where: {
          user_id: req.user.id, // Contains authenticated user
          spot_id: spotId
        }
      });

      if (userReview) {
        res.status(500).json({ message: "User already has a review for this spot" });
        return;
      }

      console.log(req.user.id);

      // Create the new review
      const newReview = await Review.create({
        user_id: req.user.id, // Contains authenticated user
        spot_id: spotId,
        review: review,
        stars: stars,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Respond with the new review
      res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });



// ROUTE TO GET DETAILS OF A SPOT FROM AN ID
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;

    try {
        const spot = await Spot.findOne({
            where: { id: spotId },
            include: [
                {
                    model: SpotImage,
                    as: 'images', // change this from 'SpotImages' to 'images'
                    attributes: ['id', 'url', 'preview', 'avgStarRating']
                },
                {
                    model: User,
                    as: 'owner', // 'owner' is correct if you have used this alias in your association
                    attributes: ['id', 'firstName', 'lastName']
                }
            ],
            attributes: ['id', 'owner_id', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt', 'numReviews', 'avgStarRating']
        });

        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }

        res.status(200).json(spot);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// ROUTE TO GET ALL SPOTS OWNED BY THE CURRENT USER
router.get('/:userId', requireAuth, async (req, res, next) => {
    const userId = req.user.id;  // Get the user ID from the authenticated user

        let spots = await Spot.findAll({
            where: {
                owner_id: userId
            },
            include: [
                { model: SpotImage, as: 'images' },
                { model: User, as: 'owner' }
            ]
        });

        if (!spots) {
            return res.status(404).json({
                message: "No spots found for the current user"
            });
        }

        res.status(200).json(spots)

});



// ROUTE TO DELETE A SPOT
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;

        // Find the spot
        const spot = await Spot.findOne({
            where: {
                id: spotId,
                owner_id: req.user.id // Check ownership
            },
            include: [
                { model: SpotImage, as: 'images' },
                { model: Review, as: 'reviews' },
                { model: Booking, as: 'bookings' }
            ]
        });

        // If spot not found or does not belong to the user, throw an error
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }


        // Delete the spot
        await spot.destroy();
        return res.status(200).json({ message: "Successfully deleted" });

});



// ROUTE TO UPDATE AN EXISTING SPOT
router.put('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;

    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body;

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        });
    }

    const spot = await Spot.findOne({
        where: {
            id: spotId,
            owner_id: userId
        }
    });

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const updatedSpot = await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.json(updatedSpot);
});



// ROUTE TO GET ALL SPOTS
router.get('/', async (req, res, next) => {

    let spots = await Spot.findAll();
    return res.status(200).json(spots);
});



// ROUTE TO ADD QUERY FILTERS TO GET ALL SPOTS
router.get('/search', requireAuth, async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    // Defaults
    page = parseInt(page) || 1;
    size = parseInt(size) || 20;

    let where = {};

    // If filters exist, add them to the where clause
    if(minLat) where.lat = { [Op.gte]: parseFloat(minLat) };
    if(maxLat) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
    if(minLng) where.lng = { [Op.gte]: parseFloat(minLng) };
    if(maxLng) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
    if(minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
    if(maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

    try {
        const spots = await Spot.findAndCountAll({
            where,
            offset: (page - 1) * size,
            limit: size,
        });

        res.json({
            Spots: spots.rows,
            page,
            size,
        });
    } catch (err) {
        res.status(400).json({
            message: "Bad Request",
            errors: err.errors
        });
    }
});


// ROUTE TO CREATE A NEW SPOT
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt } = req.body;

    const { user } = req.user;
    //const user = req.user;


    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        });
    };




    const newSpot = await Spot.create({
        owner_id: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        createdAt,
        updatedAt
    });

    res.json(newSpot);
});





module.exports = router;
