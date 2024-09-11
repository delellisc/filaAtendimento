const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    login:String,
    senha:String
});
const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;