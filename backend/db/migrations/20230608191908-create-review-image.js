'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReviewImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      review_id: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
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

    // FOREIGN KEY CONSTRAINTS!!
    return queryInterface.addConstraint('ReviewImages', {
      fields: ['review_id'],
      type: 'foreign key',
      name: 'fk_review_id_reviewimages',
      references: {
        table: 'Reviews',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });



  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ReviewImages', 'fk_review_id_reviewimages');
    await queryInterface.dropTable('ReviewImages');
  }
};
