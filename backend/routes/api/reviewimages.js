const express = require('express');
const router = express.Router();
const { Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/:reviewId/images/:imageId', requireAuth, async (req, res) => {
    const { reviewId, imageId } = req.params;

    // Find the image
    const image = await ReviewImage.findOne({
        where: {
            id: imageId,
            review_id: reviewId
        }
    });

    // If image not found, send a 404 error
    if (!image) {
        return res.status(404).json({ message: "Review Image couldn't be found" });
    }

    // Delete the image
    await image.destroy();

    return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
