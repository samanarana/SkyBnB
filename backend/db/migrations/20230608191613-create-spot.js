'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      owner_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          field: "id"
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.INTEGER
      },
      lng: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      avg_rating: {
        type: Sequelize.DECIMAL
      },
      preview_image: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });


    // FOREIGN KEY CONSTRAINT!!!!!
    // return queryInterface.addConstraint('Spots', {
    //   fields: ['owner_id'],
    //   type: 'foreign key',
    //   name: 'fk_owner_id',
    //   references: {
    //     model: 'Users',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });


  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
