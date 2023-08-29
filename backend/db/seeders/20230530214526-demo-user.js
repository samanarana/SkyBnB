'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Saman',
        lastName: 'Rana',
        email: 'saman@gmail.com',
        username: 'Samanarana',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Layla',
        lastName: 'Rana',
        email: 'puppy@gmail.com',
        username: 'Laylachewy',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Chewy',
        lastName: 'Rana',
        email: 'puppy2@gmail.com',
        username: 'Chewylayla',
        hashedPassword: bcrypt.hashSync('password4')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'Samanarana', 'Laylachewy'] }
    }, {});
  }
};
