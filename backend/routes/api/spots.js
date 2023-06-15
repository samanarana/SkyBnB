const express = require('express');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { validateQueryParams, queryFilters } = require('../../utils/validation');

const router = express.Router();


router.get('/', async (req, res, next) => {

    let spots = await Spot.findAll();
        return res.status(200).json({ Spots: spots });
});


// router.get('/:userId', async (req, res, next) => {
//     const userId = req.params.userId;

//     const spots = await Spot.findAll( { where: { owner_id: userId } } );

//     return res.status(200).json( { spots: spots} );
// });


router.get('/:spotId', async (req, res, next) => {
    console.log("In the spot route");
    const spotId = req.params.spotId;

    try {
        let spot = await Spot.findOne({
            where: {
                id: spotId
            },
            include: [
                { model: SpotImage, as: 'images' },
                { model: User, as: 'owner' }
            ]
        });

        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found"
            });
        }

        res.status(200).json(spot)
    } catch (err) {
        next(err); // Forward error to handler
    }
});




//POST //spots - Creates a new spot
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const { user } = req;
    //console.log(user, "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++THIS SHOULD BE MY USER")


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

    //console.log(req.user.id);

    const owner_id = req.user.id;


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
        price
    });

    res.json(newSpot);
});


// ROUTE TO ADD AN IMAGE TO A SPOT BASED ON THE SPOT ID
router.post('/:SpotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    const SpotId = req.params.SpotId;
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

    const spot = await Spot.findOne({
        where: {
            id: SpotId,
            owner_id: userId,
        }
    });

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const newImage = await SpotImage.create({ spot_id: SpotId, url, preview });

    res.json(newImage);
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


// ROUTE TO DELETE A SPOT
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;

        // Find the spot
        const spot = await Spot.findOne({
            where: {
                id: spotId,
                owner_id: req.user.id // Check ownership
            }
        });

        // If spot not found or does not belong to the user, throw an error
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }

        // Delete the spot
        await spot.destroy();
        return res.status(200).json({ message: "Successfully deleted" });

});




// ROUTE TO ADD QUERY FILTERS TO GET ALL SPOTS
router.get('/api/spots', validateQueryParams(queryFilters), async (req, res) => {
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

module.exports = router;
