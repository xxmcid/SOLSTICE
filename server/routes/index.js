const express = require('express');

// Initialize express
const app = express();

// Setup routes
app.use('/signup', require('./api/signup'));
app.use('/verify', require('./api/verify'));

module.exports = app;