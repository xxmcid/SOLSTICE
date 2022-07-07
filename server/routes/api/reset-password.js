const express = require('express');
const jwt = require('../../resources/jwt.js');
const User = require("../../models/User");
const md5 = require('md5');

// Initialize express
const app = express();

// Reset Password:
// Resets a user's password to a specified new password.
app.post('/', async function(req, res) {
    // Create a new User document from the request body arguments.
    let user = new User({
        password: req.body.password
    });

    // Validate the password.
    let err = validateAttributes(user);
    if (err)
        return res.status(422).json({
            "status": "failed",
            "error": err
        });

    let token = req.body.token;

    // Check for token validity and type.
    if (!jwt.checkValidity(token) || jwt.getTokenType(token) != jwt.TokenTypes.ResetPass) {
        return res.status(498).json({
            "status": "failed",
            "error": "Invalid token."
        });
    }

    // Update user's old password with new encrypted password.
    await User.updateOne({email: jwt.getEmailFromToken(token)}, {password: md5(req.body.password)})
        .catch(err => {
            return res.status(400).json({
                "status": "failed",
                "error": err
            });
        });

    // Return status code 200.
    return res.status(200).json({
        status: "success",
        error: ""
    });
});

function validateAttributes(user) {
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

