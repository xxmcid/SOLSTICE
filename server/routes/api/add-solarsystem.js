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
        name: req.body.name,
        planets: []
    });
    
    // Save the new planet to the database.
    await solarSystem
        .save()
        .then(() => {    
            // Return status code 201 (succesful and new resource was created).
            return res.status(201).json({
                "status": "success",
                "error": ""
            });
        })
        .catch(err => {
            return res.status(400).json({
                status: "failed",
                error: err
            });
        }
    );
});

module.exports = app;