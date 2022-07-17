const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Read .env
require('dotenv').config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // Initialize express
        const app = express();

        // requre cors for local testing
        app.use(cors())

        // Have Node serve the files for our built React app
        app.use(express.static(path.resolve(__dirname, '../client/build')));

        // Set JSON content type
        app.use(express.json())

        // Import routes (endpoints)
        const routes = require('./routes');
        app.use('/', routes);

        // Start the server
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
    });