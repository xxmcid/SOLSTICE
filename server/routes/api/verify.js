const express = require('express');
const jwt = require('../../resources/jwt.js');
const User = require("../../models/User");

// Initialize express
const app = express();

// User E-Mail Verification:
// Verifies a user's e-mail using a specified token.
app.get('/:token', async function(req, res) {
    let token = req.params.token;
    if (jwt.checkValidity(token) && jwt.getTokenType(token) == jwt.TokenTypes.VerifyEmail) {
        // Mark User as verified in MongoDB.
        await User.updateOne({email: jwt.getEmailFromToken(token)}, {verified: true})
            .catch(err => {
                return res.status(400).json({
                    "status": "failed",
                    "error": err
                });
            });
        
        return res.redirect('/email-verified');
        // Return status code 200.
        // return res.status(200).json({
        //     "status": "success",
        //     "error": ""
        // });
    } else {
        return res.redirect('/email-not-verified');
        // return res.status(498).json({
        //     "status": "failed",
        //     "error": "Invalid verification token. Make sure it's not expired."
        // });
    }
});

module.exports = app;

