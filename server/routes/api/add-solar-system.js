const express = require('express');
const Planet = require('../../models/Planet');
const SolarSystem = require("../../models/SolarSystem");
const jwt = require("../../resources/jwt");
const User = require("../../models/User");

// Initialize express
const app = express();

// Add Solar System:
// Creates a new solar system.
app.post('/', async function (req, res) {
    // Validate the client's session.
    let token = req.body.token;
    if (!jwt.checkValidity(token) || jwt.getTokenType(token) != jwt.TokenTypes.ClientSession)
        return res.status(498).json({
            status: "failed",
            error: "Invalid token"
        });

    // Find the user from the token.
    let user = await User.findOne({email: jwt.getEmailFromToken(token)});

    // Create a new Solar System document from the request body arguments.
    let solarSystem = new SolarSystem({
        ownerId: user._id,
        name: req.body.name || 'New Solar System',
        planets: req.body.planets || [
            {
                name: 'Sun',
                mass: 100,
                gravitationalPull: 1,
                distance: 0,
                color: "#FFEA00",
                type: 'sun',
                texturePreset: 'earth',
                moons: []
            },
            {
                name: 'Earth',
                mass: 25,
                gravitationalPull: 1,
                distance: 150,
                color: "#FFFFFF",
                type: 'planet',
                texturePreset: 'earth',
                moons: [
                    {
                        name: 'Moon',
                        mass: 15,
                        gravitationalPull: 1,
                        distance: 0,
                        color: "#efefef",
                        type: 'moon',
                        texturePreset: 'moon'
                    }
                ]
            }
        ]
    });
    
    // Save the new planet to the database.
    await solarSystem
        .save()
        .then(() => {    
            // Return status code 201 (succesful and new resource was created).
            return res.status(201).json({
                "status": "success",
                "error": "",
                "solarSystem": solarSystem
            });
        })
        .catch(err => {
            return res.status(400).json({
                status: "failed",
                error: err
            });
        });
});

module.exports = app;