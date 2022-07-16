const express = require('express');
const Planet = require("../../models/Planet");
const SolarSystem = require("../../models/SolarSystem");
const jwt = require("../../resources/jwt");

// Initialize express
const app = express();

// Remove Moon:
// Removes a specified moon.
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
    let moonId = req.body.moonId;

    // Find solar system from the database.
    let solarSystem = await SolarSystem.findById(solarSystemId);
    if (!solarSystem)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified solar system."
        });

    // Find planet from the solar system.
    let planet = solarSystem.planets.find(planet => planet._id == planetId);
    if (!planet)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified planet."
        });

    // Find the moon.
    const moonIndex = planet.moons.findIndex(moon => { return moon.id === moonId; });
    if (moonIndex == -1)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified moon."
        });

    // Remove the moon from the planet object.
    planet.moons.splice(moonIndex, 1);

    // Save the new planet to the database.
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