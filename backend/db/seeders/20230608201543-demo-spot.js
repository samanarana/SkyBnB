'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        owner_id: 1,
        address: '123 Main St',
        city: 'Example City',
        state: 'Example State',
        country: 'Example Country',
        lat: 37.12345,
        lng: -122.67890,
        name: 'Spot 1',
        description: 'This is the first spot',
        price: 100.0,
        avgStarRating: 4.5,
        preview_image: 'https://www.google.com/'
      },
      {
        id: 2,
        owner_id: 2,
        address: '456 Elm St',
        city: 'Another City',
        state: 'Another State',
        country: 'Another Country',
        lat: 38.54321,
        lng: -121.98765,
        name: 'Spot 2',
        description: 'This is the second spot',
        price: 150.0,
        avgStarRating: 4.0,
        preview_image: 'http://placekitten.com/200/300'
      },
      {
        id: 3,
        owner_id: 1,
        address: '789 Oak St',
        city: 'Third City',
        state: 'Third State',
        country: 'Third Country',
        lat: 39.87654,
        lng: -120.34567,
        name: 'Spot 3',
        description: 'This is the third spot',
        price: 200.0,
        avgStarRating: 4.8,
        preview_image: 'https://www.twitter.com/'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  }
};
