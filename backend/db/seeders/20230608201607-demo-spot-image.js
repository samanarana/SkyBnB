'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: '/Images/santorini1.png',
      preview: true
    },
    {
      spotId: 1,
      url: '/Images/santorini2.png',
      preview: true
    },
    {
      spotId: 1,
      url: '/Images/santorini3.png',
      preview: true
    },
    {
      url: '/Images/santorini4.png',
      preview: true
    },

    {
      spotId: 2,
      url: '/Images/copacabana1.png',
      preview: true
    },
    {
      spotId: 2,
      url: '/Images/copacabana2.png',
      preview: true
    },
    {
      spotId: 2,
      url: '/Images/copacabana3.png',
      preview: true
    },
    {
      spotId: 2,
      url: '/Images/copacabana4.png',
      preview: true
    },

    {
      spotId: 3,
      url: '/Images/whistler1.png',
      preview: true
    },
    {
      spotId: 3,
      url: '/Images/whistler2.png',
      preview: true
    },
    {
      spotId: 3,
      url: '/Images/whistler3.png',
      preview: true
    },
    {
      spotId: 3,
      url: '/Images/whistler4.png',
      preview: true
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, null, {});
  }
};
