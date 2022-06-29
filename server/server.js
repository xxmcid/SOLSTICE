const express = require('express');
//const mongoose = require('mongoose');
//const morgan = require('morgan');
//const cors = require('cors');
//const path = require('path');

const app = express();

app.get("/api",(req,res) => {
    res.json({"users": ["user1","user2","user3"]})
})

const PORT = process.env.PORT || 8080;
//const routes = require('./routes/api');
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
