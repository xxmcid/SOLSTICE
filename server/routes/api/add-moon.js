const express = require('express');
const Planet = require("../../models/Planet");
const SolarSystem = require("../../models/SolarSystem");
const jwt = require("../../resources/jwt");

// Initialize express
const app = express();

// Add Moon:
// Creates a new moon.
app.post('/', async function (req, res) {
    // Validate the client's session.
    let token = req.body.token;
    if (!jwt.checkValidity(token) || jwt.getTokenType(token) != jwt.TokenTypes.ClientSession)
        return res.status(498).json({
            status: "failed",
            error: "Invalid token"
        });

    // Create a new Planet document from the request body arguments.
    let moon = new Planet({
        name: req.body.moon.name,
        mass: req.body.moon.mass,
        gravitationalPull: req.body.moon.gravitationalPull,
        distance: req.body.moon.distance,
        color: req.body.moon.color,
        texturePreset: req.body.moon.texturePreset || 'moon',
        type: 'moon'
    });
    moon.moons = undefined;

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

    // Find planet from the solar system.
    let planet = solarSystem.planets.find(planet => planet._id == planetId);
    if (!planet)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified planet."
        });

    // Add moon to moons array.
    planet.moons.push(moon);
    
    // Save the new moon to the database.
    await solarSystem
        .save()
        .then(() => {    
            // Return status code 201 (succesful and new resource was created).
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