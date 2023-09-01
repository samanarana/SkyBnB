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
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583254/e1e1b575-3150-4a84-93d8-98478d488a7b_ksudxp.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583258/e8c7e7e2-a711-4e4f-b9ae-79c34dfb335d_nn0dce.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583263/fad14165-1262-4aa2-895e-1c5287df26ec_myswlv.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583268/26bb208e-91d6-40a3-845f-a736f73b56cf_keja5u.jpg',
      preview: true
    },

    {
      spotId: 2,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583144/e8329459-92c3-4cf2-bb42-aae6e3279a2c_i86bre.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583150/57fee9c9-615e-44e2-876e-88066bd36886_e7q5hu.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583167/fb5e7950-d542-4284-a64b-e5b9027d9f41_krmczr.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583159/af01cb66-54d6-4ecb-8818-1d1c24c99ec7_puu6bs.jpg',
      preview: true
    },

    {
      spotId: 3,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583089/32da848f-ccc7-410d-8ca6-8ada8be63fd7_tbmzmd.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583076/ff99d425-623f-41db-923d-c66dd89046bf_hmab0y.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583072/d853e15f-b784-48b7-ab05-6a3fdb496a8c_bjrgqi.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583098/e5e8a82b-afd4-4520-bd33-1f14ca220025_yruww5.jpg',
      preview: true
    },

    {
      spotId: 4,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693434568/ade2f12c-d3b2-4c66-9b0d-39fa8a772c9e_wnzgow.jpg',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693434576/f982ef05-5cdd-449f-9a08-e3f6e249adcf_v3nxgq.jpg',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693434584/40e333c5-609e-45db-ae60-a9f09bfa772c_lmzzgl.jpg',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693434600/d626c25f-cab3-4d8f-b7b5-432419d338a2_phndkd.jpg',
      preview: true
    },

    {
      spotId: 5,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693435682/a32105de-3961-459d-a9e8-9a4c43715161_jbrlhe.jpg',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693435715/3af478c2-a46c-431d-8262-fd6835f37b6b_stjcna.jpg',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693435723/57a52dde-097f-4269-933e-7e7b595b4b66_dkvzim.jpg',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693435748/5823e8e4-cc92-4dde-b868-75530dd88172_gwyi57.jpg',
      preview: true
    },

    {
      spotId: 6,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693435935/6df63a59-7ad7-4a4a-b28d-9796b5b97b0a_uwxwvm.jpg',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693435943/42765c15-00bd-443b-9111-c13336bc2665_ezctky.jpg',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693435960/06af3372-d4b7-43c6-ad07-fd4883eb2b36_gafhqh.jpg',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693435952/07baa603-c907-4d7e-9813-a6dddc734b77_kmqgiv.jpg',
      preview: true
    },

    {
      spotId: 7,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693436234/0a080f83-f34c-43df-8e2a-246b848f33b0_exngiv.jpg',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693436241/ba7fc836-fa4b-4e67-9c67-eea510226a74_sk3slc.jpg',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693436248/b24ef026-29cc-4dab-9a55-ec92ec3080c6_giqnwm.jpg',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693436255/3cf8a60f-467c-423e-9a6c-74d6d8c4958f_prrotr.jpg',
      preview: true
    },

    {
      spotId: 8,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693436744/95ebd3a6-f3a2-4897-bcd9-d0728f7fb4c5_yk20go.jpg',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693436750/9f4ce669-8e54-4c96-937d-40c3293f1a1d_ajboxe.jpg',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693436772/a227b40d-ed8e-4720-9221-16e9165230fe_l9epj1.jpg',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693436819/d354605e-595e-4845-a902-eeafbe78e22b_hbiaeq.jpg',
      preview: true
    },

    {
      spotId: 9,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693437042/3512b90f-76ca-44cd-ac2c-8d479525add0_rpikq8.jpg',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693437064/d54f7e44-9904-403b-a196-0d2b46279052_heklr1.jpg',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693437109/3776fab0-ea0c-4387-ad83-7f1c2a37f904_znzy3m.jpg',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693437088/0872005b-38b6-47be-8676-1f37e6016985_f6dlpb.jpg',
      preview: true
    },

    {
      spotId: 10,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693437427/901913d5-3f37-47b2-888b-e2493c56269c_hjjzs1.jpg',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693437434/c72ad3c4-43a1-4ba1-8a7c-1b4a2ead14d8_kayv4j.jpg',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693437441/b9faf3c2-c3ac-4f34-b4b5-67dd2a2246a0_tizcad.jpg',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693437455/25faf975-411b-4b50-a1fb-a317beb7390e_gebunp.jpg',
      preview: true
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(options, null, {});
  }
};
