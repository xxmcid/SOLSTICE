const express = require('express');
const jwt = require('../../resources/jwt.js');
const SolarSystem = require("../../models/SolarSystem");
const User = require("../../models/User");

// Initialize express
const app = express();

// Fetch Solar Systems:
// Fetches all solar systems from a specified user.
app.get('/:token', async function (req, res) {
    // Validate the client's session.
    let token = req.params.token;
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

    // Find solar systems from the database.
    await SolarSystem
        .find({ownerId: user._id})
        .then(solarSystems => {
            return res.status(200).json({
                "status": "success",
                "error": "",
                "solarSystems": solarSystems
            });
        })
        .catch(err => {
            return res.status(200).json({
                "status": "failed",
                "error": err
            });
        });
});

module.exports = app;