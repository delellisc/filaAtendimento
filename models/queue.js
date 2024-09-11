const mongoose = require("mongoose");
const queueSchema = new mongoose.Schema({
    queueHead:JSON
});
const Queue = mongoose.model("fila", queueSchema);
module.exports = Queue;