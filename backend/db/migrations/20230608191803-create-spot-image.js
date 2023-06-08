'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SpotImages', {
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
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });

    // FOREIGN KEY CONSTRAINT
    // return queryInterface.addConstraint('SpotImages', {
    //   fields: ['spot_id'],
    //   type: 'foreign key',
    //   name: 'fk_spot_id',
    //   references: {
    //     table: 'Spots',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SpotImages');

  }
};
