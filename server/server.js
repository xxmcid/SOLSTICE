const express = require('express');
const mongoose = require('mongoose');
//const morgan = require('morgan');
//const cors = require('cors');
const path = require('path');

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Set JSON content type
app.use(express.json())

app.post('/api/signup', function (req, res) {
    console.log(req.body);
    console.log(req);
    var newUser = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": req.body.password
    }

    res.status(201).json({"status" : "success"});
});

const PORT = process.env.PORT || 8080;
//const routes = require('./routes/api');
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
