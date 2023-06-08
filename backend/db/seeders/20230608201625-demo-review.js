'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        spot_id: 1,
        review: 'This spot is amazing!',
        stars: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        spot_id: 1,
        review: 'Great experience at this spot.',
        stars: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        spot_id: 2,
        review: 'The spot was okay, nothing special.',
        stars: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        spot_id: 3,
        review: 'I highly recommend this spot!',
        stars: 5,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
