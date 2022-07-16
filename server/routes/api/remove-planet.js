const express = require('express');
const Planet = require("../../models/Planet");
const SolarSystems = require("../../models/SolarSystem");

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

    // Gather IDs from the request body arguments.
    let solarSystemID = req.body.systemID;
    let planetID = req.body.planetID;

    // Find solar system from the database.
    let solarSystem = await SolarSystems.findById(solarSystemID);

    // Remove planet from planets array in planets object.
    const index = solarSystem.planets.findIndex(object => { return object.id === planetID; });
    solarSystem.planets.splice(index, 1);

    // Save the updated system to the database.
    await solarSystem
        .save()
        .then(() => {
            return res.status(201).json({
                "status": "success",
                "error": ""
            });
        })
        .catch(err => {
            return res.status(400).json({
                "status": "failed",
                "error": err
            });
        }
    );
});

module.exports = app;