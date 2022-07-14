const mongoose = require("mongoose");
const Planet = require('./Planet');
const User = require('./User');

const schema = mongoose.Schema({
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
    name: String,
    planets: [Planet.schema],
});

module.exports = mongoose.model("SolarSystem", schema);