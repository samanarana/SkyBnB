const express = require('express');
const { Spot, SpotImage } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const router = express.Router();



// ROUTE TO DELETE A SPOT IMAGE
router.delete('/:imageId', restoreUser, requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId;

    // Find the image
    const image = await SpotImage.findOne({
        where: {
            id: imageId
        },
        include: {
            model: Spot,
            as: 'spot'
        }
    });

    // If image not found, throw an error
    if (!image) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    // Check if the spot image belongs to the user
    if (image.spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    // Delete the image
    await image.destroy();

    return res.status(200).json({ message: "Successfully deleted" });
});



module.exports = router;
