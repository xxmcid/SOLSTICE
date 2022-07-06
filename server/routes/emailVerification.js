const express = require('express');
const User = require("../models/User");
const md5 = require('md5');

module.exports = function(app) {
    app.get('/jwt', async function(req, res) {
        const jwt = require('../JWT.js');
        let token = jwt.createVerificationToken("example@email.com", '15m');
        return res.status(200).json(token);
    });
    
    app.get('/verify/:token', async function(req, res) {
        const jwt = require('../JWT.js');
        let token = req.params.token;
        let isValid = jwt.checkExpiry(token);
        if (isValid)
        {
            console.log("True: Pretend the verification field in the database is being updated here.");
        }
        else
        {
            console.log("False");
        }
        return res.status(401).send("Unauthorized");
    });
}

