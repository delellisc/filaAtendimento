const mongoose = require("mongoose");
// const url = "mongodb+srv://arthurvinice:mongofila@db1.mqfmprk.mongodb.net/?retryWrites=true&w=majority&appName=DB1";
// troquei a string de conexão para modificar só o banco "fila"
const url = "mongodb+srv://arthurvinice:mongofila@db1.mqfmprk.mongodb.net/fila";
const Admin = require("./models/users");
const Queue = require("./models/queue")
const linkedList = require("./linkedListScript")
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
        console.error(`MONGO-ERRO: ${error.stack}`);
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
        console.error(`MONGO-ERRO: ${error.stack}`);
    }
};
// função para logar como administrador
async function login(username, password){
    try {
        const query = await Admin.find({ login: username, senha: password});
        console.log(query.length);
        if (query.length == 1){
            return true;
        }
        else{
            return false;
        }
    }
    catch (error) {
        console.error(`MONGO-ERRO: ${error.stack}`);
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
        console.error(`MONGO-ERRO: ${error.stack}`);
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
        console.error(`MONGO-ERRO: ${error.stack}`);
    }
};
// função de teste para retorno da fila
async function returnQueue(){
    try {
        const query = await Queue.find();
        if (query.length > 0){
            return query;
        }
        else{
            console.error('Não há documentos cadastrados na coleção fila')
        }
    } 
    catch (error) {
        console.error(`MONGO-ERRO: ${error.stack}`);
    }
};
// função para remover paciente
// obs.: chamar quando consulta for concluída
async function removeTopPatient(){
    try{
        let query = await returnQueue();
        if (query){
            let object = query[0];
            if (object.queueHead.length > 1){
                let currentQueue = linkedList.createQueueByJSONObject(object.queueHead);
                currentQueue.removeTopUser();
                currentQueue.printQueue();
                modifyQueue(currentQueue);
            }
            else{
                deleteQueue();
                console.log('FRONT-END: ESVAZIANDO FILA')
            };
        };
    }
    catch (error) {
        console.error(`MONGO-ERRO: ${error.stack}`);
    }
};
// função para deletar fila
async function deleteQueue(){
    try {
        // deleta primeiro documento da coleção
        await Queue.deleteOne({});
    }
    catch (error) {
        console.error(`MONGO-ERRO: ${error.stack}`);
    }
};
// função para retornar id de paciente
async function returnId(patientId){
    try {
        let object = await Queue.find();
        if (object.length == 1){
            let objectValue = object[0];
            let queue = objectValue.queueHead;
            let tmp = queue.start;
            while (tmp != null){
                if (tmp.id == patientId){
                    return tmp.position;
                }
                tmp = tmp.next;
            };
        }
        else{
            console.error('Fila não cadastrada');
            return null;
        };
    }
    catch (error) {
        console.error(`MONGO-ERRO: ${error.stack}`);
    }
};
// exportação das funções 
module.exports = {connectMongo, returnQueue, modifyQueue, insertAdmin, login, insertQueue, deleteQueue, returnId, removeTopPatient};