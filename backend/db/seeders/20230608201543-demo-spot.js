'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Oia Village',
        city: 'Santorini',
        state: 'Cyclades',
        country: 'Greece',
        lat: 36.4618,
        lng: 25.3765,
        name: 'Oia Sunset Spot',
        description: 'This spot offers a breathtaking view of the sunset over the Aegean Sea, a sight that has made Oia famous. It is a must-visit for photography and relaxation.',
        price: 350,
        previewImage: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583250/73dbf2b0-bcd5-4db3-a4d9-83aaa79fceef_gyid7s.jpg'
      },
      {
        ownerId: 2,
        address: '456 Av. Atlântica, Copacabana',
        city: 'Rio de Janeiro',
        state: 'RJ',
        country: 'Brazil',
        lat: -22.9714,
        lng: -43.1823,
        name: 'Copacabana Beach',
        description: 'Located in the heart of Rio, Copacabana Beach is one of the most famous in the world. It offers a lively atmosphere and a stunning view of Sugarloaf Mountain.',
        price: 45,
        previewImage: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583457/800px-Praia_de_Copacabana_-_Rio_de_Janeiro_2C_Brasil_r2puxf.jpg'
      },
      {
        ownerId: 3,
        address: '789 Whistler Blackcomb',
        city: 'Whistler',
        state: 'British Columbia',
        country: 'Canada',
        lat: 50.1150,
        lng: -122.9454,
        name: 'Whistler Ski Resort',
        description: 'Whistler Blackcomb is a major ski resort located in British Columbia, Canada. With a variety of ski and snowboarding trails, it is a winter sports haven.',
        price: 189,
        previewImage: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693583066/90519c39-d8ce-4467-96a5-3f06e1384905_o0qkt2.jpg'
      },
      {
        ownerId: 4,
        address: 'Faxaflatir 4',
        city: 'Hella',
        state: 'Iceland',
        country: 'Iceland',
        lat: 63.8326,
        lng: 20.3933,
        name: 'Glass Cottage',
        description: 'The experience we offer is unique. The bedroom is entirely made of glass, You can sleep under the stars in comfort and warmth. The bathroom offers views of the largest Icelandic volcanoes, Hekla, eyjafjallajökull, bláfjöll, tindfjöll… There is a fully equipped kitchen with luxury dishes and appliances. Oven, Fridge, induction hob, espresso machine, kettle, toaster. And also a private hot tub and a terrace.',
        price: 839,
        previewImage: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693434559/80385d19-c9dc-4dda-9d80-e16e55a8a6fd_zavm0u.jpg'
      },
      {
        ownerId: 5,
        address: 'C Nueva 32',
        city: 'Salobrena',
        state: 'Andalusia',
        country: 'Spain',
        lat: 36.7429,
        lng: 3.5851,
        name: 'Casa Acantilado',
        description: 'Immerse yourself in the Cliff House, an architectural icon on the Costa de Granada. Integrated into the mountain, it enjoys a stable climate of 20°C all year round. Its cutting-edge design, from the undulating roof to the luxurious furnishings, will captivate you. Relish the expansive 150 sqm living room with an open kitchen, all framed by panoramic views of the Mediterranean.',
        price: 544,
        previewImage: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693435675/1bd12dfa-f681-4979-b805-b0c7b6b5511c_x6wnth.jpg'
      },
      {
        ownerId: 6,
        address: '8475 Straumsjoen',
        city: 'Forde',
        state: 'Vestland fylke',
        country: 'Norway',
        lat: 61.4531,
        lng: 5.8509,
        name: 'Glamping Birdbox',
        description: 'Relax, rejuvenate and unplug in this unique contemporary Birdbox. Feel close to nature in ultimate comfort. Enjoy the view of the epic mountain range of Blegja and the Førdefjord. Feel the true Norwegian countryside calmness of birds chirping, rivers flowing and trees in the wind. Explore the countryside area, walk down to the fjord and take a swim, hike the surrounding mountains, relax with a good book & meditate.',
        price: 384,
        previewImage: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693435927/c596d286-57a6-460e-b6a8-9698b6f31157_lk7yvg.jpg'
      },
      {
        ownerId: 7,
        address: 'Poseidonos 1 Alimos 174 55',
        city: 'Athens',
        state: 'Attica',
        country: 'Greece',
        lat: 37.9838,
        lng: 23.7275,
        name: 'Greek Sailing Holiday',
        description: 'What makes this trip unique is that we as owners, share our private boats with guests, and we personally skipper, being your guide to the islands and places we visit. Besides my boat, we also make available other ones if you are a larger group and want to sail as flotilla (boats from 2 to 5 cabins) ! All equipped with fridge, GPS Plotter, dinghy with outboard and other extras.',
        price: 81,
        previewImage: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693436225/51c68279-7c09-4be9-a6d4-1e9a8b4fd567_zti013.jpg'
      },
      {
        ownerId: 8,
        address: '216 S Brand Blvd',
        city: 'Glendale',
        state: 'California',
        country: 'United States',
        lat: 34.142509,
        lng: -118.255074,
        name: 'Dope Artists Loft',
        description: 'This almost 1000 square ft work/live loft is one of my many homes. Ive slept here no more than a dozen times and it remains decorated and full of most the things an artist-type would need to feel completely at home. Enjoy. Make Magic. Thrive. And Smile Bright.',
        price: 156,
        previewImage: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693436739/8d3b12bf-1e18-4579-b926-6d57140f25bf_ibkars.jpg'
      },
      {
        ownerId: 9,
        address: '1349 W Rams Horn St',
        city: 'Dubois',
        state: 'Wyoming',
        country: 'United States',
        lat: 43.5364,
        lng: 109.6420,
        name: 'The Barn at Wind River',
        description: 'Welcome to The Barn at Wind River, a full concept artists and explorers retreat that provides creative workspace for musicians, painters, writers, and travelers of all kinds. Located an hour and a half from Yellowstone and Grand Teton National Parks, our mission is to give travelers a quiet place to stay while visiting our beautiful state of Wyoming and our National Parks.',
        price: 199,
        previewImage: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693437048/97b924ba-e6d7-49a9-8053-e73b56a9dfce_gpvdpt.jpg'
      },
      {
        ownerId: 10,
        address: '85 Bajo del Tigre Road',
        city: 'Monteverde',
        state: 'Puntarenas',
        country: 'Costa Rica',
        lat: 10.2740,
        lng: 84.8255,
        name: 'Eco-Villa',
        description: 'Warning! You may not want to leave anymore, it is located in a property of more than 4ha, with complete privacy and an impressive natural environment, which will allow you to enjoy a view composed of mountains, sea, valleys, plains, clouds, sunrises and sunsets that will leave you breathless. Youll certainly understand why the million dollar view.',
        price: 311,
        previewImage: 'https://res.cloudinary.com/ddlkhhzk0/image/upload/v1693437421/b6f677cf-9461-4e89-8628-a6e61015eebb_qu92q4.jpg'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  }
};
