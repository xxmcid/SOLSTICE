const express = require('express');
const Planet = require("../../models/Planet");
const SolarSystem = require("../../models/SolarSystem");
const Users = require("../../models/User");
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
    
    // Get user email from the token.
    let userEmail = jwt.getEmailFromToken(token);

    // Find user from the database.
    let user = await Users.findOne({email: userEmail});
    if (!user)
        return res.status(400).json({
            "status": "failed",
            "error": "Could not find the specified user."
        });

    // Delete the solar systems that belong to the user.
    await SolarSystem
        .deleteMany({ ownerId: user._id})
        .catch(err => {
            return res.status(400).json({
                "status": "failed",
                "error": err
            });
        });

    // Deleting the user now
    await Users
        .deleteOne(user)
        .then(() => {
            return res.status(200).json({
                "status": "success",
                "error": "",
                "userId": user._id
            });
        })
        .catch(err => {
            return res.status(400).json({
                "status": "failed",
                "error": err
            })
        });
});

module.exports = app;