const express = require('express');
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
//const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require('sequelize');
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
            id: spotId
        }
    });

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const newImage = await SpotImage.create({ spotId: spotId, url, preview });

    // Convert the Sequelize instance to plain JavaScript object
    let newImageDataValues = newImage.toJSON();

    // Remove the spotId, createdAt, updatedAt, and avgRating properties
    delete newImageDataValues.spotId;
    delete newImageDataValues.createdAt;
    delete newImageDataValues.updatedAt;
    delete newImageDataValues.avgRating;

    res.json(newImageDataValues);
});






// ROUTE TO CREATE A REVIEW FOR A SPOT BASED ON THE SPOTS ID
router.post('/:spotId/reviews', restoreUser, requireAuth, async (req, res, next) => {
    try {
        const spotId = parseInt(req.params.spotId, 10); // Extract spotId from the request parameters
        const { review, stars } = req.body; // Extract review and stars from the request body
        const userId = req.user.id; // Authenticated user's id

        // Check if spot exists
        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }

        // Check if user already reviewed this spot
        const userReview = await Review.findOne({
            where: {
                userId: userId,
                spotId: spotId
            }
        });

        if (userReview) {
            return res.status(400).json({ message: "User already has a review for this spot" });
        }


        // Validate request body
        if (!review || review.trim() === "") {
            return res.status(400).json({
                message: "Bad Request",
                errors: {
                    review: "Review text is required",
                }
            });
        }

        // Check if stars is an integer from 1 to 5
        if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
        return res.status(400).json({ message: "Stars must be an integer from 1 to 5" });
        }


        // Create the new review
        const newReview = await Review.create({
            userId: userId,
            spotId: spotId,
            review: review,
            stars: stars,
        });

        // Get all reviews related to the spot
        const reviews = await Review.findAll({
            where: { spotId: spot.id }
        });

        // Calculate numReviews and avgStarRating
        let totalStars = 0;
        reviews.forEach(review => {
            totalStars += review.stars;
        });
        const numReviews = reviews.length;
        const avgStarRating = reviews.length ? totalStars / reviews.length : 0;

        console.log('Updating spot...', spotId, numReviews, avgStarRating);
        // Update the spot
        await spot.update({
            numReviews: numReviews,
            avgRating: avgStarRating
        });
        console.log('Updated spot', spotId);

        let reviewData = newReview.get({ plain: true });

        if (reviewData.User) {
            delete reviewData.User.username;
            delete reviewData.User.email;
        }

        return res.status(201).json(reviewData);

    } catch (error) {
        console.error(error);
        next(error);
    }
});




//ROUTE TO GET ALL SPOTS OWNED BY THE CURRENT USER
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const spots = await Spot.findAll({
        where: {
            ownerId: userId
        },
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt', 'previewImage'],
        include: [
            {
              model: Review,
              as: 'reviews',
              attributes: ['stars', 'spotId'],
            },
          ],
    });

    const updatedSpots = await Promise.all(spots.map(async (spot) => {
        let spotData = spot.toJSON();
        const reviews = spotData.reviews || [];

        const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
        const avgRating = reviews.length > 0 ? totalStars / reviews.length : 0;

        // Convert lat, lng, and price to numbers
        spotData.lat = parseFloat(spotData.lat);
        spotData.lng = parseFloat(spotData.lng);
        spotData.price = parseFloat(spotData.price);

        // Format createdAt and updatedAt using moment
        spotData.createdAt = moment(spotData.createdAt).format('YYYY-MM-DD HH:mm:ss');
        spotData.updatedAt = moment(spotData.updatedAt).format('YYYY-MM-DD HH:mm:ss');

        // Add the calculated avgRating to the spotData
        spotData.avgRating = parseFloat(avgRating.toFixed(1)); // Convert to float with one decimal place

        return spotData;
    }));

    res.status(200).json({ Spots: updatedSpots });
});


// ROUTE TO DELETE A SPOT
router.delete('/:spotId', restoreUser, requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;

    // Find the spot without checking the owner
    const spot = await Spot.findOne({
        where: { id: spotId },
        include: [
            { model: SpotImage, as: 'SpotImages' },
            { model: Review, as: 'reviews' },
            { model: Booking, as: 'bookings' }
        ]
    });

    // If spot not found, throw an error
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Check if the spot belongs to the user
    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
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
            id: spotId
        }
    });

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== userId) {
        return res.status(403).json({ message: "Forbidden" });
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

    let spotData = updatedSpot.get({ plain: true });

    delete spotData.avgRating;
    delete spotData.previewImage;

    res.json(spotData);

});


// CREATE A BOOKING FROM A SPOT BASED ON THE SPOTS ID
router.post('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {

    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }


    // Check if the start date is before the end date
    if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        });

    }

    // Check if there's a booking conflict
    const conflict = await Booking.findOne({
        where: {
            spotId: spotId,
            [Op.or]: [
                {
                    startDate: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                {
                    endDate: {
                        [Op.between]: [startDate, endDate],
                    },
                },
            ],
        },
    });

    if (conflict) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        });
    }

     // Create the booking
     const booking = await Booking.create({
        spotId: spotId,
        userId: userId,
        startDate: startDate,
        endDate: endDate,
    });

    res.status(200).json(booking);
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
    });

    let spotData = newSpot.get({ plain: true });

    delete spotData.numReviews;
    delete spotData.previewImage;
    delete spotData.avgRating;


    res.json(spotData);
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
        include: [{ model: User, as: 'User'}, { model: ReviewImage, as: 'ReviewImages'}]
    });

    for (let i in reviews)
    {
        let reviewDataValues = reviews[i].toJSON();

        if (reviewDataValues.User) {
            delete reviewDataValues.User.username;
            delete reviewDataValues.User.email;
        }

        for (let y in reviewDataValues.ReviewImages) {
            delete reviewDataValues.ReviewImages[y].createdAt;
            delete reviewDataValues.ReviewImages[y].reviewId;
            delete reviewDataValues.ReviewImages[y].updatedAt;
        }

        // Format createdAt and updatedAt using moment
        reviewDataValues.createdAt = moment(reviewDataValues.createdAt).format('YYYY-MM-DD HH:mm:ss');
        reviewDataValues.updatedAt = moment(reviewDataValues.updatedAt).format('YYYY-MM-DD HH:mm:ss');

        reviews[i] = reviewDataValues;
    }

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
            { model: User, as: 'User' }
        ]
    });

    const transformedBookings = [];
    const isOwner = req.user.id === spot.ownerId;
    for(let booking of bookings) {
        if (isOwner) {
            transformedBookings.push({
                User: {
                    id: booking.User.id,
                    firstName: booking.User.firstName,
                    lastName: booking.User.lastName
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


// ROUTE TO GET DETAILS OF A SPOT FROM AN ID
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;

    try {
        const spot = await Spot.findOne({
            where: { id: spotId },
            include: [
                {
                    model: SpotImage,
                    as: 'SpotImages',
                    attributes: ['id', 'url', 'preview']
                },
                {
                    model: User,
                    as: 'Owner',
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Review,
                    as: 'reviews',
                    attributes: ['stars']
                }
            ],
            attributes: [
                'id', 'ownerId', 'address', 'city', 'state', 'country',
                'lat', 'lng', 'name', 'description', 'price', 'createdAt',
                'updatedAt', 'numReviews',
                ['avgRating', 'avgStarRating']
            ]
        });

        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }

        // Calculate avgRating and numReviews directly from the reviews
        const reviews = await Review.findAll({ where: { spotId: spot.id } });
        let totalStars = 0;
        reviews.forEach(review => {
            totalStars += review.stars;
        });
        spot.dataValues.avgStarRating = reviews.length > 0 ? totalStars / reviews.length : 0;
        spot.dataValues.numReviews = reviews.length;

        let spotDataValues = spot.toJSON();

        for (let i in spotDataValues.SpotImages) {
            delete spotDataValues.SpotImages[i].avgRating;
        }

        delete spotDataValues.reviews;

        spotDataValues.avgStarRating = spot.dataValues.avgStarRating ? parseFloat(spot.dataValues.avgStarRating.toFixed(1)) : 0;
        spotDataValues.numReviews = spotDataValues.numReviews || 0;

        res.status(200).json(spotDataValues);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});



//ROUTE TO ADD QUERY FILTERS AND TO GET ALL SPOTS
router.get('/', restoreUser, async (req, res) => {
    // Parse and validate query parameters
    let page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice;
    const errors = {};

    if (req.query.page) {
        page = parseInt(req.query.page);
        if (isNaN(page) || page < 1 || page > 10) {
            page = 1; // if page is not valid, set it to default value
        }
    } else {
        page = 1; // if page is not provided, set it to default value
    }

    if (req.query.size) {
        size = parseInt(req.query.size);
        if (isNaN(size) || size < 1 || size > 20) {
            size = 20; // if size is not valid, set it to default value
        }
    } else {
        size = 20; // if size is not provided, set it to default value
    }

    if (req.query.minLat) {
        minLat = parseFloat(req.query.minLat);
        if (isNaN(minLat) || minLat < -90 || minLat > 90) errors.minLat = "Minimum latitude is invalid";
    }

    if (req.query.maxLat) {
        maxLat = parseFloat(req.query.maxLat);
        if (isNaN(maxLat) || maxLat < -90 || maxLat > 90) errors.maxLat = "Maximum latitude is invalid";
    }

    if (req.query.minLng) {
        minLng = parseFloat(req.query.minLng);
        if (isNaN(minLng) || minLng < -180 || minLng > 180) errors.minLng = "Minimum longitude is invalid";
    }

    if (req.query.maxLng) {
        maxLng = parseFloat(req.query.maxLng);
        if (isNaN(maxLng) || maxLng < -180 || maxLng > 180) errors.maxLng = "Maximum longitude is invalid";
    }

    if (req.query.minPrice) {
    minPrice = parseFloat(req.query.minPrice);
    if (isNaN(minPrice) || minPrice < 0) errors.minPrice = "Minimum price must be greater than or equal to 0";
    }

    if (req.query.maxPrice) {
    maxPrice = parseFloat(req.query.maxPrice);
    if (isNaN(maxPrice) || maxPrice < 0) errors.maxPrice = "Maximum price must be greater than or equal to 0";
    }

    if (Object.keys(errors).length > 0) {
    return res.status(400).json({
        message: "Bad Request",
        errors
    });
    }

    // Construct query
    let where = {};

    if (minLat) where.lat = { [Sequelize.Op.gte]: minLat };
    if (maxLat) where.lat = { ...(where.lat || {}), [Sequelize.Op.lte]: maxLat };
    if (minLng) where.lng = { [Sequelize.Op.gte]: minLng };
    if (maxLng) where.lng = { ...(where.lng || {}), [Sequelize.Op.lte]: maxLng };
    if (minPrice) where.price = { [Sequelize.Op.gte]: minPrice };
    if (maxPrice) where.price = { ...(where.price || {}), [Sequelize.Op.lte]: maxPrice };

    try {
    let spots;

    const baseQuery = {
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
       'avgRating'
    ],
    raw: true,
    limit: size,
    offset: (page - 1) * size,
    order: [['createdAt', 'DESC']],
    group: ['Spot.id']
   };

   // Check if any of the relevant query parameters are present
   if (req.query.minLat || req.query.maxLat || req.query.minLng || req.query.maxLng || req.query.minPrice || req.query.maxPrice) {
     // If any of the parameters are present, apply filters and fetch paginated spots
     spots = await Spot.findAll({
       ...baseQuery,
       where,
       limit: size,
       offset: (page - 1) * size,
       order: [['createdAt', 'DESC']]
     });
   } else {
     // Otherwise, get all spots without filters
     spots = await Spot.findAll(baseQuery);
   }

   // Process spots
   spots = await Promise.all(spots.map(async (spot) => {

    const review = await Review.findOne({
      where: { spotId: spot.id },
    });

    let image;
    if (review) {
       image = await ReviewImage.findOne({
          where: { reviewId: review.id },
          attributes: ['url'],
        })};

        const reviews = await Review.findAll({
            where: { spotId: spot.id },
            attributes: ['stars']
        });

        const totalStars = reviews.reduce((acc, review) => acc + review.dataValues.stars, 0);
        const avgRating = (reviews.length > 0) ? totalStars / reviews.length : 0;
        spot.avgRating = parseFloat(avgRating.toFixed(1));

        spot.previewImage = image ? image.url : "image url";
        spot.lat = typeof spot.lat === 'string' ? parseFloat(spot.lat) : spot.lat;
        spot.lng = typeof spot.lng === 'string' ? parseFloat(spot.lng) : spot.lng;
        spot.price = typeof spot.price === 'string' ? parseFloat(spot.price) : spot.price;

        // Format createdAt and updatedAt using moment
        spot.createdAt = moment(spot.createdAt).format('YYYY-MM-DD HH:mm:ss');
        spot.updatedAt = moment(spot.updatedAt).format('YYYY-MM-DD HH:mm:ss');


     return spot;
   }));

    // Form response based on whether or not query parameters were provided
    if (req.query.page || req.query.size) {
        res.status(200).json({
        Spots: spots,
        page,
        size
        });
    } else {
        res.status(200).json({
        Spots: spots
        });
    }

    } catch (error) {
    console.log(error);
    res.status(500).json({
        message: "Internal Server Error",
        errors: error.errors
    });
    }
});

module.exports = router;
