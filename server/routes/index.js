const express = require('express');
const User = require("../models/User");
const md5 = require('md5');

// Initialize express
const app = express();

require('./emailVerification.js')(app);

// TOOD: move /signup endpoint below to the directory: /routes/api/signup.js

// User Sign-Up:
// Creates a new user as long as the email & password requirements are met.
app.post('/signup', async function (req, res) {
    // Create a new User document from the request body arguments.
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    // Validate the new User's attributes.
    let err = validateAttributes(user);
    if (err)
        return res.status(422).json({
            "status": "failed",
            "error": err
        });

    // Check whether the email is unique.
    if (await User.exists({email: user.email}))
        return res.status(409).json({
            "status": "failed",
            "error": "Your email is already in use."
        });

    // Encrypt the password.
    user.password = md5(user.password);
    
    // Save the new User to the database.
    await user
        .save()
        .then(() => {
            return res.status(201).json({
                "status": "success",
                "error": ""
            });
        })
        .catch(err => {
            return res.status(400).json({
                "status": "failed",
                "error": err
            });
        });
});


function validateAttributes(user) {
    // ### firstName:
    // NULL check.
    if (!user.firstName)
        return "Please enter your first name.";

    // At least 1 character in length.
    if (user.firstName.length < 1)
        return "Your first name must be at least 1 character in length.";

    // Less than 32 characters in length.
    if (user.firstName.length > 32)
        return "Your first name must be less than 32 characters in length.";

    // Test the pattern.
    let pattern_firstName = /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)$/;
    if (!pattern_firstName.test(user.firstName))
        return "Your first name must only contain letters.";

    // ### lastName:
    // NULL check.
    if (!user.lastName)
        return "Please enter your last name.";

    // At least 1 character in length.
    if (user.lastName.length < 1)
        return "Your last name must be at least 1 character in length.";

    // Less than 32 characters in length.
    if (user.lastName.length > 32)
        return "Your last name must be less than 32 characters in length.";

    // Test the pattern.
    let pattern_lastName = /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)$/;
    if (!pattern_lastName.test(user.lastName))
        return "Your last name must only contain letters.";

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