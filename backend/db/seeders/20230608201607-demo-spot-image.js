'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
    {
      id: 1,
      spot_id: 1,
      url: 'http://placekitten.com/200/300',
      preview: true
    },
    {
      id: 2,
      spot_id: 1,
      url: 'https://www.google.com/',
      preview: false
    },
    {
      id: 3,
      spot_id: 2,
      url: 'http://placekitten.com/200/300',
      preview: true
    },
    {
      id: 4,
      spot_id: 3,
      url: 'https://www.twitter.com/',
      preview: true
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SpotImages', null, {});
  }
};
