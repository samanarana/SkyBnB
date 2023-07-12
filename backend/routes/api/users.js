//backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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



// ROUTE TO LOGIN
router.post('/login', async (req, res) => {
  const { credential, password } = req.body;

  if (!credential || !password) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        credential: "Email or username is required",
        password: "Password is required"
      }
    });
  }

  const user = await User.findOne({
    where: { email: credential },
    attributes: ['id', 'username', 'firstName', 'lastName', 'email', 'hashedPassword'], // add hashedPassword to the attributes
  });

  const token = await setTokenCookie (res, user)

  let resObj = user.toSafeObject();

  resObj.token = token;

  resObj.firstName = user.firstName;
  resObj.lastName = user.lastName;

  user.token = token;

  if (!user || !bcrypt.compare(password, user.hashedPassword)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json(resObj);
});




// NEW ROUTE SIGNUP ENDPOINT
router.post('/', async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  // Check if all fields are filled
  if (!firstName || !lastName || !email || !username || !password) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        "firstName": "First Name is required",
        "lastName": "Last Name is required",
        "email": "Invalid email",
        "username": "Username is required"
      }
    });
  }

  // Check if user exists already
  const existingUserEmail = await User.findOne({ where: { email: email } });
  const existingUserUsername = await User.findOne({ where: { username: username } });

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
    user: {
      id,
      firstName: fName,
      lastName: lName,
      email: eMail,
      username: uName
    }
  });
});




module.exports = router;
