const express = require('express');
const Planet = require("../../models/Planet");
const SolarSystems = require("../../models/SolarSystem");
const jwt = require("../../resources/jwt");

// Initialize express
const app = express();

// User Sign-Up:
// Creates a new user as long as the email & password requirements are met.
app.post('/', async function (req, res) {
    // Create a new User document from the request body arguments.

    let token = req.body.token;
    if(jwt.checkValidity(token) && jwt.getTokenType(token) == jwt.TokenTypes.ClientSession)
    {
        let moon = new Planet({
            name: req.body.moon.name,
            mass: req.body.moon.mass,
            gravitationalPull: req.body.moon.gravitationalPull,
            distanceFromStar: req.body.moon.distanceFromStar,
            color: req.body.moon.color,
        });
    
        let systemID = req.body.systemID;
        let planetID = req.body.planetID;
    
        let system = await SolarSystems.findById(systemID);
    
        let planet = system.planets.find(x => x._id == planetID);
    
        planet.moons.push(moon);
        
        // Save the new planet to the database.
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
    })
});

module.exports = app;