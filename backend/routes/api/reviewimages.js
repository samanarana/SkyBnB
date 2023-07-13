const express = require('express');
const router = express.Router();
const { Review, ReviewImage } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

router.delete('/:imageId', restoreUser, requireAuth, async (req, res) => {
    const imageId  = req.params.imageId;

    // Find the image
    const image = await ReviewImage.findOne({
        where: {
            id: imageId,
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
