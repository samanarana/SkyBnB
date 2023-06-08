'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
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

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
