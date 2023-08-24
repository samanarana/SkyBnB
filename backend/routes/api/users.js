//backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validator = require('validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// ...
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


//NEW ROUTE - GET THE CURRENT USER
  router.get('/current', restoreUser, async (req, res) => {
    const id = req.userId;

    let user = await User.findOne({ where: { id: id } })
     if (user) {
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
       };
     return res.json({
       user: safeUser
     });
     } else {
      return res.json({
       user: null
      });
     }
    })



// NEW ROUTE SIGNUP ENDPOINT
router.post('', validateSignup, async (req, res) => {
  let errors = {};
  const { firstName, lastName, email, username, password } = req.body;

  console.log("req.body", req.body);

  // Check if user exists already
  const existingUserEmail = await User.findOne({ where: { email: email } });
  const existingUserUsername = await User.findOne({ where: { username: username } });

  if (existingUserEmail) {
    errors.email = "User with that email already exists";
  }

  if (existingUserUsername) {
    errors.username = "User with that username already exists";
  }

   // Check each field individually
   if (!firstName || !firstName.trim()) {
    errors.firstName = "First Name is required";
  }

  if (!lastName || !lastName.trim()) {
    errors.lastName = "Last Name is required";
  }

  if (!email || !validator.isEmail(email)) {
    errors.email = "Invalid email";
  }

  if (!username || !username.trim()) {
    errors.username = "Username is required";
  }

  if (!password || !password.trim()) {
    errors.password = "Password is required and cannot be only whitespace";
  }

  if (existingUserEmail) {
    errors.email = "User with that email already exists";
  }

  if (existingUserUsername) {
    errors.username = "User with that username already exists";
  }

  // If there are errors, return them
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors
    });
  }

  if (existingUserEmail) {
    return res.status(500).json({
      message: "User already exists",
      errors: {
        "email": "User with that email already exists"
      }
    });
  }

  if (existingUserUsername) {
    return res.status(500).json({
      message: "User already exists",
      errors: {
        "username": "User with that username already exists"
      }
    });
  }

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    username,
    hashedPassword: hashedPassword
  });

 // Set cookie for newly registered user to log them in
 const safeUser = {
  id: newUser.id,
  email: newUser.email,
  username: newUser.username,
};

await setTokenCookie(res, safeUser);

  // return user info
  const { id, firstName: fName, lastName: lName, email: eMail, username: uName } = newUser;
  res.status(200).json({
    id,
    firstName: fName,
    lastName: lName,
    email: eMail,
    username: uName
  });
});




module.exports = router;
