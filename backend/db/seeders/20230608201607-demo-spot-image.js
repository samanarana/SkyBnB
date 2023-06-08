'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
    {
      spot_id: 1,
      url: 'http://placekitten.com/200/300',
      preview: true
    },
    {
      spot_id: 1,
      url: 'http://placekitten.com/200/300',
      preview: false
    },
    {
      spot_id: 2,
      url: 'http://placekitten.com/200/300',
      preview: true
    },
    {
      spot_id: 3,
      url: 'http://placekitten.com/200/300',
      preview: true
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SpotImages', null, {});
  }
};
