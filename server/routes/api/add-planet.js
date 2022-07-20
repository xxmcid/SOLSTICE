const express = require('express');
const Planet = require("../../models/Planet");
const SolarSystem = require("../../models/SolarSystem");
const jwt = require("../../resources/jwt");

// Initialize express
const app = express();

// Add Planet:
// Creates a new planet.
app.post('/', async function (req, res) {
    // Validate the client's session.
    let token = req.body.token;
    if (!jwt.checkValidity(token) || jwt.getTokenType(token) != jwt.TokenTypes.ClientSession)
        return res.status(498).json({
            status: "failed",
            error: "Invalid token"
        });

    // Create a new Planet document from the request body arguments.
    let planet = new Planet({
        name: req.body.planet.name,
        mass: req.body.planet.mass,
        gravitationalPull: req.body.planet.gravitationalPull,
        distance: req.body.planet.distance,
        color: req.body.planet.color,
        type: req.body.planet.type,
        moons: []
    });

    // Gather Id from the request body arguments.
    let solarSystemId = req.body.solarSystemId;

    // Find solar system from the database.
    let solarSystem = await SolarSystem.findById(solarSystemId);
    if (!solarSystem)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified solar system."
        });

    // Add planet to planets array.
    solarSystem.planets.push(planet);
    
    // Save the updated system to the database.
    await solarSystem
        .save()
        .then(() => {    
            // Return status code 201 (succesful and new resource was created).
            return res.status(201).json({
                "status": "success",
                "error": "",
                "solarSystemId": solarSystemId,
                "planet": planet
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