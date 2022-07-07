const express = require('express');
const md5 = require('md5');
const User = require("../../models/User");

// Initialize express
const app = express();

// User Sign-In:
app.post('/', async (req, res) => {

  // Create a new User document from the request body arguments.
  let user = new User({
    email: req.body.email,
    password: req.body.password
  });

  // Validate the new User's attributes.
  let err = validateLogin(user);

  if (err)
    return res.status(401).json({
      "status": "failed",
      "error": err
    });

  // Encrypt the password.
  user.password = md5(user.password);

  const foundUser = await User.exists({
    email: user.email, 
    password: user.password,
    verified: true,
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

function validateLogin(user) {
  // ### email:
  // NULL check.
  if (!user.email) 
    return "Please enter your email.";

  // At least 1 character in length.
  if (user.email.length < 1)
      return "Your email must be at least 1 character in length.";

  // Less than 320 characters in length.
  if (user.email.length > 320)
      return "Your email must be less than 320 characters in length.";

  // Test the pattern.
  let pattern_email = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!pattern_email.test(user.email))
      return "Your email is invalid.";

  // ### password:
  // NULL check.
  if (!user.password)
      return "Please enter a password.";

  // At least 8 characters in length.
  if (user.password.length < 8)
      return "Your password must be at least 8 characters in length.";

  // Less than 32 characters in length.
  if (user.password.length > 32)
      return "Your password must be less than 32 characters in length.";

  // Test the pattern.
  let pattern_password = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,32}$/;
  if (!pattern_password.test(user.password))
      return "Your password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and 8-32 characters long.";
};

module.exports = app;