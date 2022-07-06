const express = require('express');
const jwt = require('../../resources/jwt.js');
const User = require("../../models/User");

// TODO: make the 401 error code redirect to a page for clients to see instead of JSON.
// TODO: make the 200 status code tell the clients successful verification instead of JSON.

// Initialize express
const app = express();

// User E-Mail Verification:
// Verifies a user's e-mail using a specified token.
app.get('/:token', async function(req, res) {
    let token = req.params.token;
    if (jwt.checkExpiry(token)) {

        // Mark User as verified in MongoDB.
        await User.updateOne({email: jwt.getEmailFromToken(token)}, {verified: true})
            .catch(err => {
                return res.status(400).json({
                    "status": "failed",
                    "error": err
                });
            });

        // Return status code 200.
        return res.status(200).json({
            "status": "success",
            "error": ""
        });
    } else {
        return res.status(401).json({
            "status": "failed",
            "error": "Invalid verification token. Make sure it's not expired."
        });
    }
});

module.exports = app;

