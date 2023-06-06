'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'firstName', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'lastName', {
        type: Sequelize.STRING
      })
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'firstName'),
      queryInterface.removeColumn('Users', 'lastName')
    ]);
  }
};
