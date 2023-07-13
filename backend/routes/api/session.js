//backend/routes/api/session.js

const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];


// // Log in
// router.post(
//     '/',
//     validateLogin,
//     async (req, res, next) => {
//       const { credential, password } = req.body;

//       const user = await User.unscoped().findOne({
//         where: {
//           [Op.or]: {
//             username: credential,
//             email: credential
//           }
//         }
//       });

//       if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
//         const err = new Error('Login failed');
//         err.status = 401;
//         err.title = 'Login failed';
//         err.errors = { credential: 'The provided credentials were invalid.' };
//         return next(err);
//       }

//       const safeUser = {
//         id: user.id,
//         email: user.email,
//         username: user.username,
//         firstName: user.firstName,
//         lastName: user.lastName
//       };

//       req.user = safeUser;
//       console.log(req.user);

//       await setTokenCookie(res, safeUser);

//       return res.json({
//         user: safeUser
//       });

//     }
//   );



// ROUTE TO LOGIN
router.post('', validateLogin, async (req, res) => {
  const { credential, password } = req.body;

  if (!credential || !password) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    });
  }

  const user = await User.scope('withFullName').findOne({
    where: { email: credential },
    attributes: ['id', 'firstName', 'lastName', 'email', 'hashedPassword'], // add hashedPassword to the attributes
  });

  if (!user || !(await bcrypt.compare(password, user.hashedPassword.toString()))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = await setTokenCookie(res, user);

  console.log('Token:', token); // log the token for debugging
  console.log('User:', user); // log the user for debugging


  let resObj = user.toSafeObject();

  //resObj.token = token;

  resObj.firstName = user.firstName;
  resObj.lastName = user.lastName;

  user.token = token;

  res.json(resObj);
});







  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );



  // Restore session user
router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          firstName: user.firstName, // added
          lastName: user.lastName,   // added
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );


module.exports = router;
