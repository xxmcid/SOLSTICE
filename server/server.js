const express = require('express');
//const mongoose = require('mongoose');
//const morgan = require('morgan');
//const cors = require('cors');
//const path = require('path');

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api",(req,res) => {
    res.json({"users": ["user1","user2","user3"]})
})

const PORT = process.env.PORT || 8080;
//const routes = require('./routes/api');
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
