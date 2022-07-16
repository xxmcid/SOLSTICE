const express = require('express');

// Initialize express
const app = express();

// Setup routes
app.use('/api/signin', require('./api/signin'));
app.use('/api/signup', require('./api/signup'));
app.use('/api/validate-session', require('./api/validate-session'));
app.use('/api/verify', require('./api/verify'));
app.use('/api/forgot-password', require('./api/forgot-password'));
app.use('/api/reset-password', require('./api/reset-password'));

app.use('/api/add-solarsystem', require('./api/add-solarsystem'));
app.use('/api/add-planet', require('./api/add-planet'));
app.use('/api/add-moon', require('./api/add-moon'));

app.use('/api/remove-planet', require('./api/remove-moon'));
app.use('/api/remove-moon', require('./api/remove-moon'));

app.use('/api/fetch-solar-systems', require('./api/fetch-solar-systems'));

// Handle non-matching requests from the client
app.use((req, res, next) => {
    // Attempt to add /# prefix for React's HashRouter
    if (!req.url.startsWith('/api') && !req.url.startsWith('/#'))
        return res.redirect('/#' + req.url);

    return res.status(404).send("<br><h1 align='center'>Unable to find this page. <br><br> Lost? <a href='https://solstice-project.herokuapp.com/'>Go back home</a></h1>");
});

module.exports = app;