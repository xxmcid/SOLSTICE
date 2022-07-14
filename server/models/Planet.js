const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    mass: Number,
    gravitationalPull: Number,
    distanceFromStar: Number,
    color: String,
    moons: [this]
});

module.exports = mongoose.model("Planet", schema);