'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spot_id: {
        type: Sequelize.INTEGER
      },
      review: {
        type: Sequelize.TEXT
      },
      stars: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
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

    // FOREIGN KEY CONSTRAINTTT!!!!
    return queryInterface.addConstraint('Reviews', {
      fields: ['spot_id'],
      type: 'foreign key',
      name: 'fk_spot_id_reviews',
      references: {
        table: 'Spots',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });




  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Reviews', 'fk_spot_id_reviews');
    await queryInterface.dropTable('Reviews');
  }
};
