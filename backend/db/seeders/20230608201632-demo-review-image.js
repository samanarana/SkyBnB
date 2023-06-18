'use strict';



let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(options, [
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

  down: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkDelete(options, null, {});
  }
};
