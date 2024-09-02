const mongoose = require("mongoose");
const url = "mongodb+srv://arthurvinice:mongofila@db1.mqfmprk.mongodb.net/?retryWrites=true&w=majority&appName=DB1";
const Users = require("./models/users");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url)
.then(() => {
    console.log("Conexão com o MongoDB estabelecida com sucesso!");
})
.catch((error) => {
    console.log(`Erro na tentativa de conexão: ${error.stack}`);
})