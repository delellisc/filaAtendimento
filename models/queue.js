const mongoose = require("mongoose");
const queueSchema = new mongoose.Schema({
    queueHead:JSON,
    speciality:String
});
const Queue = mongoose.model("fila", queueSchema);
module.exports = Queue;