const express = require('express');
const md5 = require('md5');
const User = require("../../models/User");
const attributes = require('../../resources/attribute-validation');

// Initialize express
const app = express();

// User Sign-In:
// Finds a User from credentials and "signs in" if the credentials match.
app.post('/', async (req, res) => {
  // Create a new User document from the request body arguments.
  let user = new User({
    email: req.body.email,
    password: req.body.password
  });

  // Validate the new User's attributes.
  let err = attributes.validate(user, ['email', 'password']);
  if (err)
    return res.status(401).json({
      "status": "failed",
      "error": err
    });

  // Encrypt the password.
  user.password = md5(user.password);

  // Search for a User with matching credentials.
  const foundUser = await User.exists({
    email: user.email, 
    password: user.password,
    verified: true
  });

  if (foundUser)
    return res.status(200).json({
      "status": "success",
      "error": ""
    });
  else
    return res.status(401).json({
      "status": "failed",
      "error": "Username or password incorrect!"
    })
    
});

module.exports = app;