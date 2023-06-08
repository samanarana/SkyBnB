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
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots',
          field: 'id'
        }
      },
      review: {
        type: Sequelize.TEXT
      },
      stars: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });

    // FOREIGN KEY CONSTRAINTTT!!!!
    // return queryInterface.addConstraint('Reviews', {
    //   fields: ['spot_id'],
    //   type: 'foreign key',
    //   name: 'fk_spot_id_reviews',
    //   references: {
    //     table: 'Spots',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });




  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};
