const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    mass: Number,
    gravitationalPull: Number,
    distance: Number,
    color: String,
    type: String,
    moons: [this]
});

module.exports = mongoose.model("Planet", schema);