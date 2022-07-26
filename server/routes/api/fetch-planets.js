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
    let planetNameSearchQuery = req.body.planetNameSearchQuery ? req.body.planetNameSearchQuery.trim() : "";

    // Find document from the database.
    let solarSystem = await SolarSystem.findById(solarSystemId);
    if (!solarSystem)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified solar system."
        });

    // Find the planets with the search query.
    let matchingPlanets = [];
    for (let i = 0; i < solarSystem.planets; i++)
        if (!planetNameSearchQuery || solarSystem.planets[i].name.trim().includes(planetNameSearchQuery))
            matchingPlanets.push(solarSystem.planets[i]);

    return res.status(201).json({
        "status": "success",
        "error": "",
        "solarSystemId": solarSystemId,
        "planetNameSearchQuery": planetNameSearchQuery,
        "matchingPlanets": matchingPlanets
    });
});

module.exports = app;