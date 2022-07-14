const express = require('express');
const Planet = require("../../models/Planet");
const SolarSystems = require("../../models/SolarSystem");

// Initialize express
const app = express();

// User Sign-Up:
// Creates a new user as long as the email & password requirements are met.
app.post('/', async function (req, res) {
    // Create a new User document from the request body arguments.
 
    
    let systemID = req.body.systemID;

    // Get system from database
    let system = await SolarSystems.findById(systemID);

    // remove planet from planets array in system
    system.planets.pop();
    
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
});

module.exports = app;