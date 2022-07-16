const express = require('express');
const jwt = require('../../resources/jwt.js');
const SolarSystems = require("../../models/SolarSystem");
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

    // Find solar systems from the database.
    let solarSystems = await SolarSystems.find({ownerId: user._id});

    // Return status code 200.
    return res.status(200).json({
        "status": "success",
        "error": "",
        "solarSystems": solarSystems
    });
});

module.exports = app;