'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-06-01',
        endDate: '2023-06-07',
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-06-10',
        endDate: '2023-06-15',
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2023-07-01',
        endDate: '2023-07-10',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {});
  }
};
