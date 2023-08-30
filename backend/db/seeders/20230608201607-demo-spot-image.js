'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693419892/73dbf2b0-bcd5-4db3-a4d9-83aaa79fceef_nutaod.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693419915/fad14165-1262-4aa2-895e-1c5287df26ec_z2lbtd.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693419930/e8c7e7e2-a711-4e4f-b9ae-79c34dfb335d_wxxlwh.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693419943/26bb208e-91d6-40a3-845f-a736f73b56cf_v0vluq.jpg',
      preview: true
    },

    {
      spotId: 2,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693420030/b4d78a6e-ef30-451c-9b9a-e5a550724a14_rrihbh.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693420043/e8329459-92c3-4cf2-bb42-aae6e3279a2c_radent.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693420052/57fee9c9-615e-44e2-876e-88066bd36886_fp21vu.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693420074/af01cb66-54d6-4ecb-8818-1d1c24c99ec7_scjjhr.jpg',
      preview: true
    },

    {
      spotId: 3,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693420140/90519c39-d8ce-4467-96a5-3f06e1384905_lsavdb.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693420149/32da848f-ccc7-410d-8ca6-8ada8be63fd7_mjj7mq.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693420223/864d74cc-c206-4235-87f3-757aed10ed93_bibe1j.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693420176/080663fa-670b-4ba2-8e28-8d9ad0bcf240_ubepms.jpg',
      preview: true
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, null, {});
  }
};
