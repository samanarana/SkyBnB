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
        userId: 2,
        spotId: 1,
        review: 'Perfection doesnt even come close to describing the stay. This is the most perfect location in Oia. Pictures do not do it justice. The host and her team are amazing. Super responsive and helpful. I cannot recommend this enough!',
        stars: 5,
      },
      {
        userId: 3,
        spotId: 1,
        review: 'We loved our stay at Oia Spirit! Location was fantastic with spectacular views. The place was clean and matched the description, but be sure to manage your expectations regarding its size (we expected it to be fairly small). Communication with the hosts was great and always responsive. We had a minor issue with our air conditioning unit at one point during our stay, and the issue was addressed within minutes.',
        stars: 4,
      },
      {
        userId: 4,
        spotId: 1,
        review: 'The host and her team are excellent. Got us from and back to our transportation easily and clearly. They gave us recommendations for food as it was off-season and even provided breakfast.',
        stars: 3,
      },
      {
        userId: 5,
        spotId: 1,
        review: 'Honestly if you want the best view, you should stay here! We didnt have to wait in line for pictures because our home was literally right there! Super close to everything!',
        stars: 4,
      },
      {
        userId: 6,
        spotId: 1,
        review: 'The hosts place is magical! Perfect location, gorgeous cave houses, and a wonderful host! I would highly recommend staying here.',
        stars: 5,
      },
      {
        userId: 7,
        spotId: 1,
        review: 'Amazing views! Very responsive host.',
        stars: 4,
      },
      {
        userId: 8,
        spotId: 1,
        review: 'Do not hesitate to reserve this gem! Less than 10 steps to the beautiful blue domes. The host provided breakfast and room service (with breakfast) everyday. The views are poster card ready.',
        stars: 3,
      },
      {
        userId: 9,
        spotId: 1,
        review: 'Best spot on the island!',
        stars: 4,
      },
      {
        userId: 10,
        spotId: 1,
        review: 'Simply the best place to stay in Oia. Personal touches, comfort, and location are all top notch. Highly recommended.',
        stars: 5,
      },
      {
        userId: 11,
        spotId: 1,
        review: 'Definitly THE place to be in Santorini! Nothing less that the typical postcard of Oia with the best view of all the island.',
        stars: 5,
      },


      {
        userId: 1,
        spotId: 2,
        review: 'This is not a normal AirBnB, but probably the best designed most comfortable places I stay at abroad. It is even better than the pictures.',
        stars: 3,
      },
      {
        userId: 3,
        spotId: 2,
        review: 'If you are coming to Rio for whatever reason, you have to stay at this place. We stayed for 5 nights and we had the most amazing time here. The hosts are so friendly and responsive. This apartment is also like a dream come true and it has every single thing you could possibly need, including beach towels, games, guitar, lots of well-equipped TVs, and so much more. ',
        stars: 5,
      },
      {
        userId: 4,
        spotId: 2,
        review: 'Just amazing! Most aesthetically beautiful decor inside and out, made the beach vibe continue while feeling at home. Cozy bed and great amenities that made the stay extra special. The host was quick to respond whenever there was a “hiccup”. Would absolutely come back!',
        stars: 5,
      },
      {
        userId: 5,
        spotId: 2,
        review: 'Great location, amazing apartment… top 5 places I ever stayed in the world.',
        stars: 5,
      },
      {
        userId: 6,
        spotId: 2,
        review: 'Great stay at this beautiful Airbnb! It was so comfortable & beautiful. Its close to the beach, stores & restaurants. Roberta was always very responsive.',
        stars: 3,
      },
      {
        userId: 7,
        spotId: 2,
        review: 'Very beautiful place! View of Christ the Redeemer was stunning, amenities were perfect and decoration was amazing. Easy and early check in!',
        stars: 5,
      },
      {
        userId: 8,
        spotId: 2,
        review: 'Amazing host. Amazing apartment. Would go back in a heartbeat. Trip of a lifetime.',
        stars: 4,
      },
      {
        userId: 9,
        spotId: 2,
        review: 'Josely and Celso were very helpful and kind, the apartment was beautiful and very thoughtfully decorated. The outdoor area was great and the hot tub was amazing. The building is secure with a doorman. Overall would definitely book their place again.',
        stars: 5,
      },
      {
        userId: 10,
        spotId: 2,
        review: 'Pristine and well located apartment.',
        stars: 4,
      },
      {
        userId: 11,
        spotId: 2,
        review: 'Very well-kept place, tastefully decorated, generates a homey atmosphere.',
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
      {
        userId: 5,
        spotId: 3,
        review: 'Lovely little space, had all the essentials and in beautiful surroundings.',
        stars: 5,
      },
      {
        userId: 6,
        spotId: 3,
        review: 'The Suite that I rented out of Doug & Elyse was incredible. Beautiful patio and breathtaking views of the mountains with large glass doors. Perfectly decorated interior design. I have this place bookmarked for whenever I come back to Vancouver.',
        stars: 5,
      },
      {
        userId: 7,
        spotId: 3,
        review: 'Great space for a quiet trip. Bed was comfortable and the linens were nice quality. Check in was very easy. The views are incredible! Overall a fabulous stay.',
        stars: 4,
      },
      {
        userId: 8,
        spotId: 3,
        review: 'Stunning bedroom, very nicely decorated to match the beautiful views. About 10 to 15 minutes drive from whistler.',
        stars: 4,
      },
      {
        userId: 9,
        spotId: 3,
        review: 'Excellent choice for a quiet weekend getaway.',
        stars: 5,
      },
      {
        userId: 10,
        spotId: 3,
        review: 'Very quiet, beautiful surroundings, and views , great showerhead, and the banana loaf was a beautiful touch.',
        stars: 5,
      },
      {
        userId: 11,
        spotId: 3,
        review: 'What a beautiful place to stay! Amazing views and just a short drive from Whistler, this place is so cosy and well equipped, with a vert comfortable bed and modern facilties, Doug and Elise were great and helpful hosts giving good local recommendations. We totally loved our stay and highly recommended this place!',
        stars: 4,
      },

      {
        userId: 1,
        spotId: 4,
        review: 'We had the most amazing honeymoon staying at the glass cottages. The property was absolutely stunning and the remote surroundings were gorgeous. We loved waking up in the middle of the night with a lovely surprise of a star filled sky and the northern lights!',
        stars: 5,
      },
      {
        userId: 2,
        spotId: 4,
        review: 'Unique property, well appointed. It has a central location for trips to the sights on the South Coast and Golden Circle. Very convenient for a day trip on the ferry to Westman Islands which is highly recommended. The host was very responsive and helpful. We were there in good weather and access road was very easy to find and well maintained. The place is very small. No real room to store anything except under the bed, would have been nice if the cottage was just a little bigger so it could have a closet and a little more space to put things.',
        stars: 3,
      },
      {
        userId: 3,
        spotId: 4,
        review: 'We loved our stay - the glass cottage was so beautiful!',
        stars: 4,
      },
      {
        userId: 5,
        spotId: 4,
        review: 'The glass cottage was secluded, clean, beautiful, unique, and had amazing views. It was one of the most picturesque places we have stayed. However, there were a few things that took away from our experience. It was not as private as we expected. There are two cottages and they are near each other. You can easily see the other cottage and each cottages hot pot was easy to see from the other. We did not realize this when booking. We thought it was by itself. We stayed during some warm beautiful weather which was great, but it got quite warm inside.',
        stars: 2,
      },
      {
        userId: 6,
        spotId: 4,
        review: 'If youre thinking twice about booking this cottage, just book it. You wont regret it even once. We had a very special experience staying in this beautiful cottage. Would recommend without thinking twice.',
        stars: 5,
      },
      {
        userId: 7,
        spotId: 4,
        review: 'What can I say, this was a dream! Loved being out in a remote location in this beautiful glass cottage. The cottage was exactly as advertised. Clean home, private, beautiful location. We had a wonderful evening unwinding after having been out exploring most of the day.',
        stars: 5,
      },
      {
        userId: 8,
        spotId: 4,
        review: 'Lovely cabin, very clear instructions and video to reach it, even though its in a secluded location. There was everything you need, from pasta and tea to sleep masks. Cabin is beautiful.',
        stars: 5,
      },
      {
        userId: 9,
        spotId: 4,
        review: 'This was really unique experience. Its one place where picture dont capture true justice. Waking up to see amazing 360 view was one heck of an experience.',
        stars: 5,
      },
      {
        userId: 10,
        spotId: 4,
        review: 'What a unique experience in Iceland! We enjoyed our night here very much and would recommend it to anyone!',
        stars: 5,
      },
      {
        userId: 11,
        spotId: 4,
        review: 'Thank you for the wonderful stay.',
        stars: 4,
      },

      {
        userId: 1,
        spotId: 5,
        review: 'We loved this house, the breathtaking views, the privacy and the space. It was sad to leave and we are looking forward to coming back as soon as we can!',
        stars: 5
      },
      {
        userId: 2,
        spotId: 5,
        review: 'We had a fantastic, unforgettable stay at the property. It’s stunning, relaxing, recharging. It has all the required amenities. Just one detail - you need an experienced driver to navigate the narrow turns of the road to reach the property the last 100 m.',
        stars: 4
      },
      {
        userId: 3,
        spotId: 5,
        review: 'Lucky to have had the opportunity to experience this place. 4 days was not enough!! Photos don’t do it justice. Very communicative host who is always on hand for any questions.',
        stars: 5
      },
      {
        userId: 4,
        spotId: 5,
        review: 'Wow what an amazing experience to stay in this beautiful home! We absolutely loved it and highly recommended you stay as it’s fabulous.',
        stars: 5
      },
      {
        userId: 6,
        spotId: 5,
        review: 'Amazing place in a great setting. Spectacular! Walk to town is fun, but not for people with mobility issues. Would love to come back sometime.',
        stars: 4
      },
      {
        userId: 7,
        spotId: 5,
        review: 'The architecture is extraordinary but the objects and decor that fill the home are cheap and tacky. The beds could be better quality with the option for duvets on colder nights.',
        stars: 3
      },
      {
        userId: 8,
        spotId: 5,
        review: 'Absolutely stunning! Memories for a lifetime - thank you',
        stars: 5
      },
      {
        userId: 9,
        spotId: 5,
        review: 'This is an outstanding holiday venue. The views are breathtaking. It is like living in a work of art. Bogdan was very helpful and communication was excellent. A unique and unforgettable experience.',
        stars: 5
      },
      {
        userId: 10,
        spotId: 5,
        review: 'I was with my family, and the truth is that the Cliff house left us pleasantly surprised by its architecture and ocean views! Being in the mountain its temperature is wonderful even in winter',
        stars: 5
      },
      {
        userId: 11,
        spotId: 5,
        review: 'Awesome place, different house, architectural solution, recommended to spend a few days',
        stars: 4
      },

      {
        userId: 1,
        spotId: 6,
        review: 'Incredible views and very cozy. Amenities are limited but can be easily prepared for. We read the reviews before staying and they were very helpful. Overall an unforgettable stay!',
        stars: 5
      },
      {
        userId: 2,
        spotId: 6,
        review: 'A true gem, truly a breathtaking experience!',
        stars: 5
      },
      {
        userId: 3,
        spotId: 6,
        review: 'One thing I looked most to on our roadtrip through Norway was the overnight stay at the Birdbox. Once arrived - even though it was constantly raining - the view from the little Birdbox was just breathtaking! This experience was absolutely incredible and I am glad we did it!',
        stars: 5
      },
      {
        userId: 4,
        spotId: 6,
        review: 'The box is a very special experience. We loved it. Make sure to pack a light bag from your car with toiletries, food, and a bit of extra water. The walk to the box is a bit steep.',
        stars: 5
      },
      {
        userId: 5,
        spotId: 6,
        review: 'Arriving at and staying in the birdbox itself is an amazing experience and the view is stunning at every moment of the day & night. Although it would have been nice to receive a bit more information upfront or in the general description of the ad regarding the accommodation / availabilities next to the birdbox itself.',
        stars: 4
      },
      {
        userId: 6,
        spotId: 6,
        review: 'The Place is isolated and very peaceful. Enjoyed the scenery and nature. The Host was very kind and had clear instructions. Highly recommend it.',
        stars: 5
      },
      {
        userId: 7,
        spotId: 6,
        review: 'Lived up to and beyond expectations. Easily one of the best Airbnb experiences I’ve had. The bird box is extremely comfortable and the perfect stop to take in the amazing view between cities.',
        stars: 5
      },
      {
        userId: 8,
        spotId: 6,
        review: 'absolutely amazing place. Do beware that there is no shower. a suggestion for the place would be to install an outdoor shower, nothing fancy, just the most basic.',
        stars: 4
      },
      {
        userId: 9,
        spotId: 6,
        review: 'This was really unique experience. The view is amazing and it\'s so peaceful here. We packed some pizza and wine with us and just enjoyed the views. The bed was really big and comfortable. We really loved our stay.',
        stars: 5
      },
      {
        userId: 10,
        spotId: 6,
        review: 'Amazing place to sleep (or stay awake all night to enjoy the view), really something different and a unique experience.',
        stars: 5
      },

      {
        userId: 1,
        spotId: 7,
        review: 'Wonderful experience with great experiences, locations and company. The host was absolutely brilliant with the whole family and took us to some wonderful places and we learnt a massive amount from both him and the trip. Couldn’t recommend any higher was a really special trip all round.',
        stars: 5,
      },
      {
        userId: 2,
        spotId: 7,
        review: 'Wanted to do something unique for my 40th and this delivered! While we were hampered by the weather in terms of where we could sail our captain didn’t let it get in the way and came up with a great plan for our trip.',
        stars: 4,
      },
      {
        userId: 3,
        spotId: 7,
        review: 'We have had the trip of a lifetime. He was flexible and understanding that sometimes we just were overwhelmed the restaurants he took us two were insane. I literally all I can do is hope that I can come back again soon and do this again, because oh my gosh, I’m going to be talking about this trip for the rest of my life.',
        stars: 5,
      },
      {
        userId: 4,
        spotId: 7,
        review: 'Sailing probably is one of the best way to look around Greece. Despite growing up by the sea and know lots of water sports, this trip still offered us an unique experience to know about the Greek lifestyle on sea. I felt safe in the journey and our skipper is responsible.',
        stars: 4,
      },
      {
        userId: 5,
        spotId: 7,
        review: 'Best vacation ever.',
        stars: 5,
      },
      {
        userId: 6,
        spotId: 7,
        review: 'There is nothing like sailing, add in the Greek Isles and you have a dream come true. The captain was amazing - very knowledgeable and trustworthy. Be aware that you are to pay for the captains meals during the trip but that is a small price for this incredible adventure.',
        stars: 5,
      },
      {
        userId: 8,
        spotId: 7,
        review: 'We had a nice trip from Athens to Poros with Cesare. Because of the wind we didn’t sail a lot, but the kids had a great time snorkling around.',
        stars: 3,
      },
      {
        userId: 9,
        spotId: 7,
        review: 'Best sailing ever. The host is a complete gem. He is very knowledgeable, organized, warm and kind. He was incredibly helpful with so many aspects of the sailing trip and went above and beyond in every instance. The boat was always pristine.',
        stars: 5,
      },
      {
        userId: 10,
        spotId: 7,
        review: 'Everything is perfect. Thank you.',
        stars: 5,
      },
      {
        userId: 11,
        spotId: 7,
        review: 'Every day spent on the boat was absolutely magical. The choice of islands, the activities to do there, the coves for swimming in turquoise waters, the tavernas where you can taste local specialties. The boat is very comfortable for a family of 4. This stay was perfect in every way and we will be happy to come back.',
        stars: 5,
      },

      {
        userId: 1,
        spotId: 8,
        review: 'We felt like staying here was staying inside a creatives mind! There was so much to look at enjoy. The space is filled with all sorts of fun oddities but everything was super clean and comfortable. Really made us feel at home. Awesome experience',
        stars: 5,
      },
      {
        userId: 2,
        spotId: 8,
        review: 'Beautiful, eclectic air bnb…would highly recommend',
        stars: 4,
      },
      {
        userId: 3,
        spotId: 8,
        review: 'Extraordinary accomodations for those in the know... If you are creative or admire those with creative sensibilities you will be astonished. Part comfortable accomodations part art installation this place was perfect.',
        stars: 5,
      },
      {
        userId: 4,
        spotId: 8,
        review: 'Amazing stay at a safe place hidden in plain sight felt like a night locked in an amzing antique shop loove all the art decor loved our stay and will be back for the other cool units there !',
        stars: 5,
      },
      {
        userId: 5,
        spotId: 8,
        review: 'Great place with a lot of unique art & many Easter eggs throughout the building. There was always something new to look at when focusing on a different section. The only thing that does take some time to figure out is the lights as the projector only stays on if a certain portion of the lights are kept off and another portion are kept on.',
        stars: 4,
      },
      {
        userId: 6,
        spotId: 8,
        review: 'Super unique space. Really loved staying here and I look forward to coming back.',
        stars: 4,
      },
      {
        userId: 7,
        spotId: 8,
        review: 'This spot is such a gem. Absolutely inspiring and beautiful. Love how creative and cool this place is. Definitely recommend it for anyone who wants to be in LA. DTLA is close by and about 15 minutes away.',
        stars: 5,
      },
      {
        userId: 9,
        spotId: 8,
        review: 'I enjoyed my stay here. Loved all the art and each day I found something new. The place had a great energy to it. As a solo female traveler I felt safe walking in the neighborhood. It\'s right off the main street but not a lot of foot traffic just the occasional siren but nothing to be concerned about.',
        stars: 3,
      },
      {
        userId: 10,
        spotId: 8,
        review: 'Absolutely cool place. Loved the designs and art and the unique pieces throughout the loft. Very inspiring place and very happy to have found it. Parking is easy enough right outside- never any issues. Thanks for hosting!!',
        stars: 5,
      },
      {
        userId: 11,
        spotId: 8,
        review: 'An awesome stay! Super interesting space, comfortable, easy check in, great host.',
        stars: 5,
      },


      {
        userId: 1,
        spotId: 9,
        review: 'One of a kind folks and Airbnb! It was a unique experience staying here and can’t wait to do it again!',
        stars: 4
      },
      {
        userId: 2,
        spotId: 9,
        review: 'Peter & Kim’s place was wonderful - we enjoyed everything about our stay. They were so helpful and kind - suggesting different hikes, places to eat, etc. We would recommend this place to anyone traveling to Wyoming!',
        stars: 5
      },
      {
        userId: 3,
        spotId: 9,
        review: 'Nice quiet location, the barn was perfect for us.',
        stars: 3
      },
      {
        userId: 4,
        spotId: 9,
        review: 'Place was great for us and our dogs. Right on the wind river with fishing access. Great views and lots of space! Will definitely be coming back in the future!',
        stars: 5
      },
      {
        userId: 5,
        spotId: 9,
        review: 'Great location, more to do locally than Jackson and Yellowstone. We enjoyed the local hiking and museums more.',
        stars: 4
      },
      {
        userId: 6,
        spotId: 9,
        review: 'What a great and well thought out place. The attention to detail was impeccable. An attentive host and one of a kind space. Great fun!',
        stars: 5
      },
      {
        userId: 7,
        spotId: 9,
        review: 'We had such a great time. The Kitchen was great and helped in preparing our meals. The setting was spectacular.',
        stars: 5
      },
      {
        userId: 8,
        spotId: 9,
        review: 'The place os wonderful. Beautifull location, close to Tetons and Yellowstone. We are a family of 6 and place had plenty of space to sleep, play board games, etc. River is steps from the front door and views are great',
        stars: 5
      },
      {
        userId: 10,
        spotId: 9,
        review: 'We loved our stay! The accommodation is unique. Very clean and has a nice modern bathroom and kitchen. A short walk to the river allowed us to catch a beautiful brown trout. The surroundings are gorgeous',
        stars: 5
      },
      {
        userId: 11,
        spotId: 9,
        review: 'Best air bnb I have ever stayed in and I’ve been in air bnbs all over the world. Amazing location, scenery, the home truly makes you feel like you’re in the Wild West. Best part, the hosts!!',
        stars: 5
      },


      {
        userId: 1,
        spotId: 10,
        review: 'Stunning views. We never left. Relaxed. Loved the weather changes and the view was awe inspiring.',
        stars: 5,
      },
      {
        userId: 2,
        spotId: 10,
        review: 'This place is so nice! Happy to have spend here some days with my family with teenagers. LOCATION is extraordinary. The house is situated on the hill, close to the road and still you have a feeling of being in the middle of nowhere. The view is breathtaking - during sunrise, day, sunset, and night. We had one night a spectacular show of lightening and thunder in the far distance. Amazing!',
        stars: 5,
      },
      {
        userId: 3,
        spotId: 10,
        review: 'Best view around, SUPER COOL STAY!!! Off the beaten path but that’s exactly what we wanted! Definitely recommend',
        stars: 4,
      },
      {
        userId: 4,
        spotId: 10,
        review: 'Stunning view. Got all the info we needed up front, and they even left us a few treats from local companies. The bathrooms were very nice and even came with conditioner, which was nice. The whole house is just lovely.',
        stars: 5,
      },
      {
        userId: 5,
        spotId: 10,
        review: 'One of a kind experience staying at this Airbnb. We will be back!',
        stars: 4,
      },
      {
        userId: 6,
        spotId: 10,
        review: 'If you can afford it, don’t even think twice, just book it. It’s worth every penny!! The view is beyond any description. Would stay again. 10/10',
        stars: 5,
      },
      {
        userId: 7,
        spotId: 10,
        review: 'Exceptional place! Very beautiful house decorated with a lot of good taste. What we loved the most were the amazing views that were available in any room. In the evening we enjoyed the view of the clouds slowly covering the hills. It was absolutely incredible. The place is very private and quite.',
        stars: 5,
      },
      {
        userId: 8,
        spotId: 10,
        review: 'When we got there the villa was covered in the clouds but in about 30min the weather changed and we could see how beautiful it really was! And then when we woke up in the morning the view was perfection!! So amazing! The bill to drive up to the house is not bad at all. There is a hill to walk with your luggage but they left a dolly to help you which I thought was very nice!',
        stars: 4,
      },
      {
        userId: 9,
        spotId: 10,
        review: 'The views were priceless and the place was exactly as described with a fully equipped kitchen and magnificent and special bathrooms (one with its own garden and little waterfall, the other with views to the mountain and trees outside. The scenic porches were both a grate place to read and relax. The laundry service helped a lot',
        stars: 4,
      },
      {
        userId: 11,
        spotId: 10,
        review: 'The house was perfect and lived up to the name! The views were amazing.',
        stars: 5,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, null, {});
  }
};
