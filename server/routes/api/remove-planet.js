const express = require('express');
const Planet = require("../../models/Planet");
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
    let planetId = req.body.planetId;

    // Find solar system from the database.
    let solarSystem = await SolarSystem.findById(solarSystemId);
    if (!solarSystem)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified solar system."
        });

    // Find the planet.
    const planetIndex = solarSystem.planets.findIndex(planet => { return planet.id === planetId; });
    if (planetIndex == -1)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified planet."
        });
    
    // Remove the planet from the solar system object.
    solarSystem.planets.splice(planetIndex, 1);

    // Save the updated system to the database.
    await solarSystem
        .save()
        .then(() => {
            return res.status(201).json({
                "status": "success",
                "error": "",
                "planets": solarSystem.planets
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