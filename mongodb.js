const mongoose = require("mongoose");
// const url = "mongodb+srv://arthurvinice:mongofila@db1.mqfmprk.mongodb.net/?retryWrites=true&w=majority&appName=DB1";
// troquei a string de conexão para modificar só o banco "fila"
const url = "mongodb+srv://arthurvinice:mongofila@db1.mqfmprk.mongodb.net/fila";
const Admin = require("./models/users");
const Queue = require("./models/queue")
/*
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
*/
// função que estabelece conexão com mongo
function connectMongo(){
    try {
        mongoose.connect(url)
        .then(() => {
            console.log("Conexão com o MongoDB estabelecida com sucesso!");
        })
        .catch((error) => {
            console.log(`Erro na tentativa de conexão: ${error.stack}`);
        })    
    }
    catch (error) {
        console.error(`Não foi possível estabelecer conexão com o Mongo: ${error.stack}`)
    };
};
// função para inserir o usuário admin
// obs.: é pra ser chamada apenas uma vez
async function insertAdmin(username, password){
    try {
        const admin = new Admin({ login: username, senha: password});
        await admin.save();
    }
    catch (error) {
        console.error(`Erro ao inserir admin: ${error.stack}`);
    }
};
// função para inserir fila no mongodb
// to-do: alterar o primeiro registro da fila toda vez que alguma alteração for feita
async function insertQueue(topPatient){
    try {
        const teste = new Queue({ queueHead: topPatient });
        await teste.save();
    } 
    catch (error) {
        console.error(`Erro ao inserir fila: ${error.stack}`);
    }
};
// função para modificar fila
async function modifyQueue(topPatient){
    try {
        const query = await Queue.find();
        if (query.length > 0){
            const updateQuery = await Queue.updateOne({_id:query[0]._id},{queueHead:topPatient});
            returnQueue();
        }
        else{
            insertQueue(topPatient);
        };
    } 
    catch (error) {
        console.error(`Erro ao atualizar fila: ${error.stack}`)
    }
};
// função de teste para retorno da fila
async function returnQueue(){
    try {
        const query = await Queue.find();
        if (query.length > 0){
            console.log(query[0]);
        }
        else{
            console.log('tem nada aqui nao rapaz')
        }
    } 
    catch (error) {
        console.error(`Erro ao retornar fila: ${error.stack}`);    
    }
};
// exportação das funções 
module.exports = {connectMongo, returnQueue, modifyQueue, insertAdmin, insertQueue};