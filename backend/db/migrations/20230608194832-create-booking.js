'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spot_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      start_date: {
        type: Sequelize.STRING
      },
      end_date: {
        type: Sequelize.STRING
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



     // FOREIGN KEY FOR spot_id
     await queryInterface.addConstraint('Bookings', {
      fields: ['spot_id'],
      type: 'foreign key',
      name: 'fk_spot_id_bookings',
      references: {
        table: 'Spots',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    // FOREIGN KEY FOR user_id
    return queryInterface.addConstraint('Bookings', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_id_bookings',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Bookings', 'fk_spot_id_bookings');
    await queryInterface.removeConstraint('Bookings', 'fk_user_id_bookings');
    await queryInterface.dropTable('Bookings');
  }
};
