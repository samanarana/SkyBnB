'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    await queryInterface.createTable("SpotImages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots',
          field: 'id'
        }
      },
      url: {
        type: Sequelize.TEXT
      },
      preview: {
        type: Sequelize.BOOLEAN
      },
      avgRating: {
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }, options);


  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    await queryInterface.dropTable(options);

  }
};
