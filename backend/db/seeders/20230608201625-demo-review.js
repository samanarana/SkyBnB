'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        review: 'This spot is amazing!',
        stars: 5,
      },
      {
        userId: 2,
        spotId: 1,
        review: 'Great experience at this spot.',
        stars: 4,
      },
      {
        userId: 1,
        spotId: 2,
        review: 'The spot was okay, nothing special.',
        stars: 3,
      },
      {
        userId: 3,
        spotId: 3,
        review: 'I highly recommend this spot!',
        stars: 5,
      }
    ], {});

    const spots = [
      {
        id: 1,
        avgRating: (5 + 4) / 2, // Calculate the average rating for Spot 1
      },
      {
        id: 2,
        avgRating: 3, // Only one review for Spot 2
      },
      {
        id: 3,
        avgRating: 5, // Only one review for Spot 3
      },
    ];

    // Update the Spots table with the calculated average ratings
    for (const spot of spots) {
      await queryInterface.bulkUpdate(
        "Spots",
        { avgRating: spot.avgRating },
        { id: spot.id }
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(options, null, {});

    // Reset the average rating for each spot in the Spots table
    await queryInterface.bulkUpdate(
      { tableName: "Spots", schema: options.schema },
        { avgRating: 0 },  // Or set it to a default value
        {}
    );
  }
};
