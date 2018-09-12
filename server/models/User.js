const mongoose = require("mongoose");


const  userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    date: {type: Date, default: Date.now()},
    password: String,
    ava: String
});
module.exports = mongoose.model("User", userSchema);