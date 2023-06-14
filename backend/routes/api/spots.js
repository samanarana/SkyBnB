const express = require('express');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

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
    console.log(user, "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++THIS SHOULD BE MY USER")


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


module.exports = router;
