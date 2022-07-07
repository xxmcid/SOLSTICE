const express = require('express');

// Initialize express
const app = express();

// TODO: auto setup routes by looking at the /api directory?

// Setup routes
app.use('/signup', require('./api/signup'));
app.use('/verify', require('./api/verify'));
app.use('/forgot-password', require('./api/forgot-password'));

module.exports = app;