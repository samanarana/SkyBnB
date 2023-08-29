'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Oia Village',
        city: 'Santorini',
        state: 'Cyclades',
        country: 'Greece',
        lat: 36.4618,
        lng: 25.3765,
        name: 'Oia Sunset Spot',
        description: 'This spot offers a breathtaking view of the sunset over the Aegean Sea, a sight that has made Oia famous. It is a must-visit for photography and relaxation.',
        price: 250.0,
        previewImage: '/Images/santoriniPreview.jpg'
      },
      {
        ownerId: 2,
        address: '456 Av. Atlântica, Copacabana',
        city: 'Rio de Janeiro',
        state: 'RJ',
        country: 'Brazil',
        lat: -22.9714,
        lng: -43.1823,
        name: 'Copacabana Beach',
        description: 'Located in the heart of Rio, Copacabana Beach is one of the most famous in the world. It offers a lively atmosphere and a stunning view of Sugarloaf Mountain.',
        price: 120.0,
        previewImage: '/Images/copacabanaPreview.jpg'
      },
      {
        ownerId: 3,
        address: '789 Whistler Blackcomb',
        city: 'Whistler',
        state: 'British Columbia',
        country: 'Canada',
        lat: 50.1150,
        lng: -122.9454,
        name: 'Whistler Ski Resort',
        description: 'Whistler Blackcomb is a major ski resort located in British Columbia, Canada. With a variety of ski and snowboarding trails, it is a winter sports haven.',
        price: 200.0,
        previewImage: '/Images/whistlerPreview.jpg'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  }
};
