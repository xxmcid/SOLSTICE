const express = require('express');
const jwt = require('../../resources/jwt.js');
const User = require("../../models/User");

// Initialize express
const app = express();

// Validate a Client Session Token:
// Validates that a user's client session token is still active/valid.
app.get('/:token', async function(req, res) {
    let token = req.params.token;
    if (jwt.checkValidity(token) && jwt.getTokenType(token) == jwt.TokenTypes.ClientSession) {
        // Return status code 200.
        return res.status(200).json({
            "status": "success",
            "error": ""
        });
    } else {
        return res.status(498).json({
            "status": "failed",
            "error": "Invalid verification token. Make sure it's not expired."
        });
    }
});

module.exports = app;

