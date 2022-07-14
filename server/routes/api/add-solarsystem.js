const express = require('express');
const Planet = require('../../models/Planet');
const SolarSystem = require("../../models/SolarSystem");
const jwt = require("../../resources/jwt");
const User = require("../../models/User");

// Initialize express
const app = express();

// Add Solar System:
// Creates a new user as long as the email & password requirements are met.
app.post('/', async function (req, res) {

    // Create a new User document from the request body arguments.
    let token = req.body.token;
    if (jwt.checkValidity(token) && jwt.getTokenType(token) == jwt.TokenTypes.ClientSession)
    {        
        let user = await User.findOne({email: jwt.getEmailFromToken(token)});

        let system = new SolarSystem({
            ownerId: user._id,
            name: req.body.systemName,
            planets: []
        });
        
        // Save the new planet to the database.
        await system
            .save()
            .catch(err => {
                return res.status(400).json({
                    status: "failed",
                    error: err
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