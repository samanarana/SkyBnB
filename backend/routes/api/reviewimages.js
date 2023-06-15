const express = require('express');
const router = express.Router();
const { Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/reviews/:reviewId/images/:imageId', requireAuth, async (req, res, next) => {

    const { reviewId, imageId } = req.params;

        // Find the review
        const review = await Review.findByPk(reviewId);

        // If review not found or does not belong to the user, throw an error
        if (!review || review.userId !== req.user.id) {
            return res.status(404).json({ message: "Review couldn't be found" });
        }

        // Find the image
        const image = await ReviewImage.findOne({
            where: {
                id: imageId,
                review_id: reviewId
            }
        });

        // If image not found, throw an error
        if (!image) {
            return res.status(404).json({ message: "Review Image couldn't be found" });
        }

        // Delete the image
        await image.destroy();

        return res.status(200).json({ message: "Successfully deleted" });

});

module.exports = router;
