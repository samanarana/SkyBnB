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
        reviewId: 1,
        url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693422419/753de249-3efe-47f5-8d47-a35a352d1741_o04s1b.jpg'
      },
      {
        reviewId: 2,
        url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693422419/753de249-3efe-47f5-8d47-a35a352d1741_o04s1b.jpg'
      },
      {
        reviewId: 3,
        url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693422419/753de249-3efe-47f5-8d47-a35a352d1741_o04s1b.jpg'
      },
      {
        reviewId: 4,
        url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693422419/753de249-3efe-47f5-8d47-a35a352d1741_o04s1b.jpg'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "ReviewImages";
    return queryInterface.bulkDelete(options, null, {});
  }
};
