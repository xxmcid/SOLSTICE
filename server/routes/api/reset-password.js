const express = require('express');
const jwt = require('../../resources/jwt.js');
const User = require("../../models/User");
const md5 = require('md5');

// Initialize express
const app = express();

// User E-Mail Verification:
// Verifies a user's e-mail using a specified token.
app.post('/', async function(req, res) {

    let token = req.body.token;

    if(jwt.checkValidity(token) && jwt.getTokenType(token) == jwt.TokenTypes.ResetPass)
    {
            // Token is valid and not expired
        await User.updateOne({email: jwt.getEmailFromToken(token)}, {password: md5(req.body.password)})
            .catch(err => {
                return res.status(400).json({
                    "status": "failed",
                    "error": err
                });
            }
        );
        return res.status(200).json({status: "success", error: ""});
    }
    return res.status(498).json({
        "status": "failed",
        "error": "Invalid token."
    });

});

module.exports = app;

