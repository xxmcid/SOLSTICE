const express = require('express');
const Planet = require("../../models/Planet");
const SolarSystems = require("../../models/SolarSystem");
const jwt = require("../../resources/jwt");

// Initialize express
const app = express();

app.post('/', async function (req, res) {
    // Create a new User document from the request body arguments.

    let token = req.body.token;
    if(jwt.checkValidity(token) && jwt.getTokenType(token) == jwt.TokenTypes.ClientSession)
    {
    
        let systemID = req.body.systemID;
        let planetID = req.body.planetID;
    
        let system = await SolarSystems.findById(systemID);
    
        let planet = system.planets.find(x => x._id == planetID);
    //remove moon from moons array in planets object
        planet.moons.pop();
        
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