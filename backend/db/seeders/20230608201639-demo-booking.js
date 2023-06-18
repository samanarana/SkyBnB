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
        spot_id: 1,
        user_id: 1,
        start_date: '2023-06-01',
        end_date: '2023-06-07',
      },
      {
        spot_id: 2,
        user_id: 2,
        start_date: '2023-06-10',
        end_date: '2023-06-15',
      },
      {
        spot_id: 3,
        user_id: 1,
        start_date: '2023-07-01',
        end_date: '2023-07-10',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {});
  }
};
