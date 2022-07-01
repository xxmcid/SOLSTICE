const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// TODO: replace password for MongoDB into a .env file or something similar to not expose it.

// Connect to MongoDB
mongoose
    .connect("mongodb+srv://solstice:cop4331@solstice.tsw0a.mongodb.net/SOLSTICE?retryWrites=true&w=majority")
    .then(() => {
        // Initialize express
        const app = express();

        // Have Node serve the files for our built React app
        app.use(express.static(path.resolve(__dirname, '../client/build')));

        // Set JSON content type
        app.use(express.json())

        // Import routes (endpoints)
        const routes = require('./routes');
        app.use('/api', routes);

        // Start the server
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
    });