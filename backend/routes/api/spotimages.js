const express = require('express');
const { Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const router = express.Router();



// ROUTE TO DELETE A SPOT IMAGE
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId;


    //console.log('Request Parameters:', req.params);


    // Find the image
    const image = await SpotImage.findOne({
        where: {
            id: imageId
        }
    });

    //console.log('Image Found:', image);

    // If image not found, throw an error
    if (!image) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    // Delete the image
    await image.destroy();

    return res.status(200).json({ message: "Successfully deleted" });
});



module.exports = router;
