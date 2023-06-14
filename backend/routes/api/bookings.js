const express = require('express');
const router = express.Router();
const { Booking, Spot, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');



// ROUTE TO GET ALL OF THE CURRENT USERS BOOKINGS
router.get('/user/:userId', requireAuth, async (req, res, next) => {

    const userId = req.params.userId;

    // Find all bookings by this user
    const bookings = await Booking.findAll({
        where: {
            user_id: userId,
        },
        include: [{ model: Spot, as: 'spot' }]
    });

    // Respond with the bookings
    res.json({ Bookings: bookings });

});


// ROUTE TO GET ALL BOOKINGS FOR A SPOT BASED ON THE SPOTS ID
router.get('/spot/:spotId', requireAuth, async (req, res, next) => {

    const spotId = req.params.spotId;

    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        res.status(404).json({ message: "Spot couldn't be found" });
        return;
    }

    // Find all bookings for this spot
    const bookings = await Booking.findAll({
        where: {
            spot_id: spotId,
        },
    });

    // If the current user is the owner of the spot, include user data in response
    if(req.user.id === spot.ownerId) {
        for(let booking of bookings) {
            booking.user = await User.findByPk(booking.user_id);
        }

        // Respond w the bookings w user details
        res.json({ Bookings: bookings });
    } else {
        // Respond w the bookings w/o user details
        res.json({
            Bookings: bookings.map(booking => ({
                spotId: booking.spot_id,
                startDate: booking.start_date,
                end_date: booking.end_date
            }))
        });
    }

});



// CREATE A BOOKING FROM A SPOT BASED ON THE SPOTS ID
router.post('/spot/:spotId', requireAuth, async (req, res) => {

    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);

    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // The user should not book their own spot
    if (userId === spot.ownerId) {
        return res.status(403).json({ message: "Cannot book your own spot" });
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
            spot_id: spotId,
            [Op.or]: [
                {
                    start_date: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                {
                    end_date: {
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
        spot_id: spotId,
        user_id: userId,
        start_date: startDate,
        end_date: endDate,
    });

    res.status(200).json(booking);
});



// ROUTE FOR EDITING A BOOKING
router.put('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId; // Extract bookingId from the request parameters
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    // Check if the booking exists and belongs to the current user
    const booking = await Booking.findOne({
        where: {
            id: bookingId,
            user_id: userId,
        },
    });

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    // The user can't edit a booking that's past the end date
    if (new Date(booking.end_date) < new Date()) {
        return res.status(403).json({ message: "Past bookings can't be modified" });
    }

    // Check if the start date is before the end date
    if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot come before startDate"
            }
        });
    }

    // Check if there's a booking conflict with other bookings (not including the current one)
    const conflict = await Booking.findOne({
        where: {
            id: {
                [Op.ne]: bookingId,
            },
            spot_id: booking.spot_id,
            [Op.or]: [
                {
                    start_date: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                {
                    end_date: {
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

     // Update the booking
     booking.start_date = startDate;
     booking.end_date = endDate;
     await booking.save();

     res.status(200).json(booking);

});

module.exports = router;
