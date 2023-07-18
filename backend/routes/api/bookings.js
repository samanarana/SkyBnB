const express = require('express');
const router = express.Router();
const { Booking, Spot, User } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');


// ROUTE TO GET ALL OF THE CURRENT USERS BOOKINGS
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {

    const userId = req.user.id;

    // Find all bookings by this user
    const bookings = await Booking.findAll({
        where: {
            userId: userId,
        },
        include: [{ model: Spot, as: 'Spot' }]
    });

    for (let i in bookings) {
        // Convert the Sequelize instances to plain JavaScript objects
        let bookingDataValues = bookings[i].toJSON();

        if (bookingDataValues.Spot) {
            delete bookingDataValues.Spot.createdAt;
            delete bookingDataValues.Spot.updatedAt;
            delete bookingDataValues.Spot.avgRating;
            delete bookingDataValues.Spot.description;
        }

        // Replace the original booking with the modified booking
        bookings[i] = bookingDataValues;
    };


    console.log ("bookings after delete SPOT datavalues:", bookings[0].Spot.dataValues, "len", bookings.length);
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




// ROUTE FOR EDITING A BOOKING
router.put('/:bookingId', restoreUser, requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId; // Extract bookingId from the request parameters
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    // Check if the booking exists and belongs to the current user
    const booking = await Booking.findOne({
        where: {
            id: bookingId,
            userId: userId,
        },
    });

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    // Check if the booking belongs to the current user
    if (booking.userId !== userId) {
        return res.status(403).json({ message: "You do not have permission to edit this booking" });
    }


    // The user can't edit a booking that's past the end date
    if (new Date(booking.endDate) < new Date()) {
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
            spotId: booking.spotId,
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

     // Update the booking
     booking.startDate = startDate;
     booking.endDate = endDate;
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
        },
        include: { model: Spot, as: 'Spot' }
    });

    // If booking not found, throw an error
    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    // Check if the booking belongs to the user or if the spot of the booking belongs to the user
    if (booking.userId !== req.user.id && booking.Spot.ownerId !== req.user.id) {
        return res.status(403).json({ message: "You don't have permission to delete this booking" });
    }

    // Delete the booking
    await booking.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
});


module.exports = router;
