'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
      {
        userId: 4,
        spotId: 1,
        review: 'Perfection doesn’t even come close to describing the stay. This is the most perfect location in Oia. Pictures do not do it justice. Mary and her team are amazing. Super responsive and helpful. I cannot recommend this enough!',
        stars: 5,
      },
      {
        userId: 2,
        spotId: 1,
        review: 'We loved our stay at Oia Spirit! Location was fantastic with spectacular views. The place was clean and matched the description, but be sure to manage your expectations regarding its size (we expected it to be fairly small). Communication with the hosts (primarily Mary) was great and always responsive. We had a minor issue with our air conditioning unit at one point during our stay, and the issue was addressed within minutes.',
        stars: 4,
      },
      {
        userId: 3,
        spotId: 1,
        review: 'Mary and her team are excellent. Got us from and back to our transportation easily and clearly. They gave us recommendations for food as it was off-season and even provided breakfast.',
        stars: 4,
      },


      {
        userId: 1,
        spotId: 2,
        review: 'This is not a normal AirBnB, but probably the best designed most comfortable places I stay at abroad. It is even better than the pictures.',
        stars: 3,
      },
      {
        userId: 4,
        spotId: 2,
        review: 'If you are coming to Rio for whatever reason, you have to stay at this place. We stayed for 5 nights and we had the most amazing time here. The hosts are so friendly and responsive. This apartment is also like a dream come true and it has every single thing you could possibly need, including beach towels, games, guitar, lots of well-equipped TVs, and so much more. ',
        stars: 5,
      },
      {
        userId: 3,
        spotId: 2,
        review: 'Just amazing! Most aesthetically beautiful decor inside and out, made the beach vibe continue while feeling at home. Cozy bed and great amenities that made the stay extra special. The host was quick to respond whenever there was a “hiccup”. Would absolutely come back!',
        stars: 5,
      },

      {
        userId: 1,
        spotId: 3,
        review: 'We had an incredible stay! Thank you for keeping this space so clean and inviting. The windows out to the Village make for such lovely people watching and the outdoor space was so peaceful for our morning coffee (and mountain-viewing)! The surrounding area has so many good restaurants and fun activities we struggled with choosing! We had an excellent stay from start to finish. Thank you!',
        stars: 5,
      },
      {
        userId: 2,
        spotId: 3,
        review: 'The spot was okay, nothing special. Good location and well-maintained. Quick responses from manager.',
        stars: 2,
      },
      {
        userId: 4,
        spotId: 3,
        review: 'Cute place and perfect location. We were walking distance to everything and it was easy to use the locker to store our snowboards and walk to the gondola in the mornings. The brewhouse across the street plays loud music until about 10:30pm. Nothing bad, just know that you’ll hear it even while watching tv. We would definitely stay here again.',
        stars: 4,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, null, {});
  }
};
