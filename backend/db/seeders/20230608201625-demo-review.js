'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
      {
        spot_id: 1,
        review: 'This spot is amazing!',
        stars: 5,
      },
      {
        spot_id: 1,
        review: 'Great experience at this spot.',
        stars: 4,
      },
      {
        spot_id: 2,
        review: 'The spot was okay, nothing special.',
        stars: 3,
      },
      {
        spot_id: 3,
        review: 'I highly recommend this spot!',
        stars: 5,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, null, {});
  }
};
