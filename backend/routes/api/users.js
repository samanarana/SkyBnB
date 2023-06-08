//backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
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

// Sign up
router.post(
  '',
  validateSignup,
  async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);



//NEW ROUTE - GET THE CURRENT USER
router.get('/user/:userId', async (req, res) => {
  const id = req.params.userId;
  let user;

  try {
      user = await User.findOne({ where: { id: id } });
  } catch (err) {
      return res.status(500).send(err);
  }

  if(user) {
      return res.status(200).json({
          user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              username: user.username,
          }
      });
  } else {
      return res.status(200).json({
          user: null,
      });
  }
});



// NEW ROUTE - GET THE LOGIN WITH VALID CREDENTIALS
app.post('/login', async (req, res) => {
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

  const user = await User.findOne({
    where: { email: credential }
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const { id, firstName, lastName, email, username } = user;

  res.status(200).json({
    user: {
      id,
      firstName,
      lastName,
      email,
      username
    }
  });
});


// NEW ROUTE SIGNUP ENDPOINT
app.post('/signup', async (req, res) => {
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

  // Hash the password b4 storing
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword
  });

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
