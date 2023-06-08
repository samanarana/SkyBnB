'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ReviewImages', [
      {
        review_id: 1,
        url: 'http://placekitten.com/200/300'
      },
      {
        review_id: 2,
        url: 'http://placekitten.com/200/300'
      },
      {
        review_id: 3,
        url: 'http://placekitten.com/200/300'
      },
      {
        review_id: 4,
        url: 'http://placekitten.com/200/300'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
