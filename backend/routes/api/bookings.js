const express = require('express');
const router = express.Router();
const { Booking, Spot, User } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');



// ROUTE TO GET ALL OF THE CURRENT USERS BOOKINGS
router.get('/:userId', restoreUser, requireAuth, async (req, res, next) => {

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




// CREATE A BOOKING FROM A SPOT BASED ON THE SPOTS ID
router.post('/spot/:spotId', restoreUser, requireAuth, async (req, res) => {

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
router.put('/:bookingId', restoreUser, requireAuth, async (req, res) => {
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


// ROUTE TO DELETE A BOOKING
router.delete('/:bookingId', restoreUser, requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId;

    // Find the booking
    const booking = await Booking.findOne({
        where: {
            id: bookingId,
            [Op.or]: [
                {user_id: req.user.id}, // Booking belongs to the user
                { '$spot.owner_id$': req.user.id } // Spot of the booking belongs to the user
            ]
        },
        include: { model: Spot, as: 'spot' }
    });

    // If booking not found or does not belong to the user or the spot does not belong to the user, throw an error
    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    // Delete the booking
    await booking.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
});


module.exports = router;
