const express = require('express');
const Planet = require("../../models/Planet");
const SolarSystems = require("../../models/SolarSystem");
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

    // Gather IDs from the request body arguments.
    let solarSystemID = req.body.systemID;
    let planetID = req.body.planetID;
    let moonID = req.body.moonID;

    // Find documents from the database.
    let solarSystem = await SolarSystems.findById(solarSystemID);
    let planet = solarSystem.planets.find(x => x._id == planetID);

    // Remove the moon from moons array in planets object.
    const index = planet.moons.findIndex(object => { return object.id === moonID; });
    planet.moons.splice(index, 1);

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