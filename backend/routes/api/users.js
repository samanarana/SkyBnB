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



// Sign up
// router.post(
//   '',
//   validateSignup,
//   async (req, res) => {
//     const { firstName, lastName, email, password, username } = req.body;
//     const hashedPassword = bcrypt.hashSync(password);
//     const user = await User.create({ firstName, lastName, email, username, hashedPassword });

//     const safeUser = {
//       id: user.id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       username: user.username,
//     };

//     await setTokenCookie(res, safeUser);

//     return res.json({
//       user: safeUser
//     });
//   }
// );




// router.get('./user/:userId', async (req, res) => {
//   const id = req.userId;

//   let user = await User.findOne({ where: { id: id } })
//    if (user)  {
//       return res.status(200).json({
//         user: {
//           id: user.id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           username: user.username,
//         }
//       });
//     } else {
//       return res.status(200).json({
//         user: null,
//       });
//     }
//   })


//NEW ROUTE - GET THE CURRENT USER
  router.get('/api/session', restoreUser, async (req, res) => {
    const id = req.params.userId;
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
router.post('/api/session', async (req, res) => {
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

  user.token = token;

  //console.log(user, "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++this should be my user ^");
  if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  console.log({ user: resObj }, "+++++++++++++++++++++++++++++++++++++++++++++++++++++this is my user")
  //res.status(200)
  res.json(resObj);
  //res.status(200).json({ user: { id, firstName, lastName, email, username } = user });
});




// NEW ROUTE SIGNUP ENDPOINT
router.post('/api/users', async (req, res) => {
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
    hashedPassword: hashedPassword
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
