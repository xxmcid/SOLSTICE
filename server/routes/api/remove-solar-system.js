const express = require('express');
const SolarSystem = require("../../models/SolarSystem");
const jwt = require('../../resources/jwt.js');

// Initialize express
const app = express();

// Remove Planet:
// Removes a specified planet.
app.post('/', async function (req, res) {
    // Validate the client's session.
    let token = req.body.token;
    if (!jwt.checkValidity(token) || jwt.getTokenType(token) != jwt.TokenTypes.ClientSession)
        return res.status(498).json({
            status: "failed",
            error: "Invalid token"
        });

    // Gather Ids from the request body arguments.
    let solarSystemId = req.body.solarSystemId;

    // Find solar system from the database.
    await SolarSystem.findByIdAndDelete(solarSystemId)
        .then(() => {
            return res.status(200).json({
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

module.exports = app;