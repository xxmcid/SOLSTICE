const mongoose = require("mongoose");

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    verified: Boolean
});

module.exports = mongoose.model("User", schema);