const express = require('express');
const jwt = require('../../resources/jwt.js');
const Users = require("../../models/User");

// Initialize express
const app = express();

// Validate a Client Session Token:
// Validates that a user's client session token is still active/valid.
app.get('/:token', async function(req, res) {
    // Validate the client's session.
    let token = req.params.token;
    if (!jwt.checkValidity(token) || jwt.getTokenType(token) != jwt.TokenTypes.ClientSession)
        return res.status(498).json({
            "status": "failed",
            "error": "Invalid verification token. Make sure it's not expired."
        });

    // Get user email from the token.
    let userEmail = jwt.getEmailFromToken(token);

    // Find user from the database.
    let user = await Users.findOne({email: userEmail});
    if (!user)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified user."
        });
    
    // Return status code 200.
    return res.status(200).json({
        "status": "success",
        "error": ""
    });
});

module.exports = app;

