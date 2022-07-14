const express = require('express');
const Planet = require("../../models/Planet");
const SolarSystems = require("../../models/SolarSystem");
const jwt = require("../../resources/jwt");

// Initialize express
const app = express();

// Add planet:
// Creates a new user as long as the email & password requirements are met.
app.post('/', async function (req, res) {

    let token = req.body.token;

    if (jwt.checkValidity(token) && jwt.getTokenType(token) == jwt.TokenTypes.ClientSession)
    {
        // Create a new User document from the request body arguments.
        let planet = new Planet({
            name: req.body.planet.name,
            mass: req.body.planet.mass,
            gravitationalPull: req.body.planet.gravitationalPull,
            distanceFromStar: req.body.planet.distanceFromStar,
            color: req.body.planet.color,
            moons: []
        });

        
        let systemID = req.body.systemID;

        // Get system from database
        let system = await SolarSystems.findById(systemID);

        // Add planet to planets array
        system.planets.push(planet);
        
        // Save the updated system to the database.
        await system
            .save()
            .catch(err => {
                return res.status(400).json({
                    "status": "failed",
                    "error": err
                });
            }
        );
        return res.status(201).json({
            "status": "success",
            "error": ""
        });
    }
    return res.status(498).json({
        status: "failed",
        error: "Invalid token"
    });
});

module.exports = app;