// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');


const userRoutes = require('./users');
const spotRoutes = require('./spots');
const spotImagesRouter = require('./spotimages');
const reviewsRouter = require('./reviews');
const bookingsRouter = require('./bookings');
const reviewImagesRouter = require('./reviewimages');



// Register your API routes
router.use('/users', userRoutes);
router.use('/spots', spotRoutes);
router.use('/spotimages', spotImagesRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/reviewimages', reviewImagesRouter);



// backend/routes/index.js
// ...
// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });
  // ...


router.use('/api', apiRouter);

module.exports = router;
