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
      spot_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots',
          field: 'id'
        }
      },
      url: {
        type: Sequelize.STRING
      },
      preview: {
        type: Sequelize.BOOLEAN
      },
      avgStarRating: {
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });


  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    await queryInterface.dropTable(options);

  }
};
