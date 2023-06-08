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
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      preview: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // FOREIGN KEY CONSTRAINT
    return queryInterface.addConstraint('SpotImages', {
      fields: ['spot_id'],
      type: 'foreign key',
      name: 'fk_spot_id',
      references: {
        table: 'Spots',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('SpotImages', 'fk_spot_id');
    await queryInterface.dropTable('SpotImages');

  }
};
