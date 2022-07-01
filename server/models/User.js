const mongoose = require("mongoose");

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

module.exports = mongoose.model("User", schema);