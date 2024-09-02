const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    login:String,
    senha:String
});
const Users = mongoose.model("users", userSchema);
module.exports = Users;