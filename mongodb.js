const mongoose = require("mongoose");
const url = "";
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