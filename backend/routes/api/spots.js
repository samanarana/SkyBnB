const express = require('express');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
//const { handleValidationErrors } = require('../../utils/validation');
const Sequelize = require('sequelize');
const router = express.Router();
const moment = require('moment');

// ROUTE TO ADD AN IMAGE TO A SPOT BASED ON THE SPOT ID
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res, next) => {
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
            ownerId: userId
        }
    });

    if (!spot) {  // If the spot doesn't exist
        return res.status(404).json({ message: "Spot couldn't be found or user does not own the spot." });
    }

    const newImage = await SpotImage.create({ spotId: spotId, url, preview });


    // Remove the spotId, createdAt, updatedAt, and avgRating properties
    delete newImage.dataValues.spotId;
    delete newImage.dataValues.createdAt;
    delete newImage.dataValues.updatedAt;
    delete newImage.dataValues.avgRating;


    res.json(newImage);
});







// ROUTE TO CREATE A REVIEW FOR A SPOT BASED ON THE SPOTS ID
router.post('/:spotId/reviews', restoreUser, requireAuth, async (req, res, next) => {
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
          userId: req.user.id, // Contains authenticated user
          spotId: spotId
        }
      });

      if (userReview) {
        res.status(500).json({ message: "User already has a review for this spot" });
        return;
      }

    //   console.log(req.user.id);

      // Create the new review
      const newReview = await Review.create({
        userId: req.user.id, // Contains authenticated user
        spotId: spotId,
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
                    attributes: ['id', 'url', 'preview', 'avgRating']
                },
                {
                    model: User,
                    as: 'owner', // 'owner' is correct if you have used this alias in your association
                    attributes: ['id', 'firstName', 'lastName']
                }
            ],
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt', 'numReviews', 'avgRating']
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

// ROUTE TO GET ALL SPOTS
router.get('/', async (req, res, next) => {

    let spots = await Spot.findAll({
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
            [Sequelize.fn('AVG', Sequelize.col('reviews.stars')), 'avgRating']
        ],
        include: [{
            model: Review,
            as: 'reviews',
            attributes: [],
        }],
        group: ['Spot.id'],
        raw: true,
    });

    // process spots
    spots = await Promise.all(spots.map(async (spot) => {
        const image = await ReviewImage.findOne({
            where: { reviewId: spot.id },
            attributes: ['url'],
        });
        spot.previewImage = image ? image.url : null;
        spot.lat = typeof spot.lat === 'string' ? parseFloat(spot.lat) : spot.lat;
        spot.lng = typeof spot.lng === 'string' ? parseFloat(spot.lng) : spot.lng;
        spot.price = typeof spot.price === 'string' ? parseFloat(spot.price) : spot.price;

        spot.createdAt = moment(spot.createdAt).format('YYYY-MM-DD HH:mm:ss');
        spot.updatedAt = moment(spot.updatedAt).format('YYYY-MM-DD HH:mm:ss');

        spot.avgRating = parseFloat(parseFloat(spot.avgRating).toFixed(1));

        return spot;
    }));

    return res.status(200).json({ Spots: spots });
});



// //ROUTE TO GET ALL SPOTS OWNED BY THE CURRENT USER
// router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
//     const userId = req.user.id;  // Get the user ID from the authenticated user

//         let spots = await Spot.findAll({
//             where: {
//                 ownerId: userId
//             },
//             include: [
//                 { model: SpotImage, as: 'images' },
//                 { model: User, as: 'owner' }
//             ]
//         });

//         if (!spots) {
//             return res.status(404).json({
//                 message: "No spots found for the current user"
//             });
//         }

//         res.status(200).json(spots)

// });


// ROUTE TO GET ALL SPOTS OWNED BY THE CURRENT USER
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;  // Get the user ID from the authenticated user

    let spots = await Spot.findAll({
        where: {
            ownerId: userId
        },
        include: [
            {
                model: SpotImage,
                as: 'images',
                attributes: ['url', 'preview']
            },
        ]
    });

    if (!spots) {
        return res.status(404).json({
            message: "No spots found for the current user"
        });
    }

    spots = spots.map(spot => {
        const newSpot = spot.toJSON();

        const defaultImageUrl = "image url";

        // Select the preview image from the images array
        const previewImage = newSpot.images.find(image => image.preview);
        newSpot.previewImage = previewImage ? previewImage.url : defaultImageUrl;

        delete newSpot.images;
        delete newSpot.owner;

        newSpot.avgRating = spot.avgRating ? parseFloat(parseFloat(spot.avgRating).toFixed(1)) : 0;

        newSpot.lat = parseFloat(newSpot.lat);
        newSpot.lng = parseFloat(newSpot.lng);
        newSpot.price = parseFloat(newSpot.price);

        return newSpot;
    });

    res.status(200).json({ Spots: spots });
});


// ROUTE TO DELETE A SPOT
router.delete('/:spotId', restoreUser, requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;

        // Find the spot
        const spot = await Spot.findOne({
            where: {
                id: spotId,
                ownerId: req.user.id // Check ownership
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
router.put('/:spotId', restoreUser, requireAuth, async (req, res) => {
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
            ownerId: userId
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
router.post('/', restoreUser, requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt } = req.body;

    const user = req.user;


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
        ownerId: user.id,
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
    }, {
        attributes: {
            exclude: ['avgRating']
        }
    });

// Remove the numReviews, previewImage, and avgRating properties
delete newSpot.dataValues.numReviews;
delete newSpot.dataValues.previewImage;
delete spotObj.avgRating;


    res.json(newSpot);
});




// ROUTE FOR GETTING ALL REVIEWS BY A SPOTS ID
router.get('/:spotId/reviews', restoreUser, async (req, res, next) => {
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



// ROUTE TO GET ALL BOOKINGS FOR A SPOT BASED ON THE SPOTS ID
router.get('/:spotId/bookings', restoreUser, requireAuth, async (req, res, next) => {

    const spotId = req.params.spotId;

    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Find all bookings for this spot
    const bookings = await Booking.findAll({
        where: { spotId: spotId },
        include: [
            { model: User, as: 'user' }
        ]
    });

    const transformedBookings = [];
    const isOwner = req.user.id === spot.ownerId;
    for(let booking of bookings) {
        if (isOwner) {
            transformedBookings.push({
                User: {
                    id: booking.user.id,
                    firstName: booking.user.firstName,
                    lastName: booking.user.lastName
                },
                id: booking.id,
                spotId: booking.spotId,
                userId: booking.userId,
                startDate: booking.startDate,
                endDate: booking.endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            });
        } else {
            transformedBookings.push({
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
            });
        }
    }

    // Respond w the bookings
    res.json({ Bookings: transformedBookings });

});






module.exports = router;
