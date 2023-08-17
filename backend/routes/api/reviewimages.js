const express = require('express');
const router = express.Router();
const { Review, ReviewImage } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

// DELETE A REVIEW IMAGE ROUTE
router.delete('/:imageId', restoreUser, requireAuth, async (req, res) => {
    const imageId  = req.params.imageId;

    // Find the image
    const image = await ReviewImage.findOne({
        where: {
            id: imageId,
        },
        include: {
            model: Review,
            as: 'review'
        }
    });

    // If image not found, send a 404 error
    if (!image) {
        return res.status(404).json({ message: "Review Image couldn't be found" });
    }

    // Check if the review image belongs to the user
    if (image.review.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    // Delete the image
    await image.destroy();

    return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
