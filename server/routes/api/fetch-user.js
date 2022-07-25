const express = require('express');
const jwt = require('../../resources/jwt.js');
const SolarSystem = require("../../models/SolarSystem");
const User = require("../../models/User");

// Initialize express
const app = express();

// Fetch User:
// Fetches a user's first name, last name, and email.
app.post('/', async function (req, res) {
    // Validate the client's session.
    let token = req.body.token;
    if (!jwt.checkValidity(token) || jwt.getTokenType(token) != jwt.TokenTypes.ClientSession)
        return res.status(498).json({
            status: "failed",
            error: "Invalid token"
        });

    // Find the user from the token.
    let user = await User.findOne({email: jwt.getEmailFromToken(token)});
    if (!user)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified user."
        });

    // Return user data
    return res.status(200).json({
        "status": "success",
        "error": "",
        "user": {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "verified": user.verified
        }
    });
});

module.exports = app;