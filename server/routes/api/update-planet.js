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

    // Gather Ids from the request body arguments.
    let solarSystemId = req.body.solarSystemId;
    let planetId = req.body.planet._id;

    // Find document from the database.
    let solarSystem = await SolarSystem.findById(solarSystemId);
    if (!solarSystem)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified solar system."
        });

    // Find the planet.
    const planetIndex = solarSystem.planets.findIndex(planet => { return planet.id === planetId; });
    if (planetIndex == -1)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified planet."
        });

    // Update the planet in the solar system object.
    solarSystem.planets[planetIndex] = req.body.planet;

    // Save the updated solar system to the database.
    await solarSystem
        .updateOne({planets: solarSystem.planets})
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