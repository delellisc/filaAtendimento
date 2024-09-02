const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ifrn.cn",
    database: "fila_atendimento"
});
function connect(){
    connection.connect((error) => {
        if(error){
            console.error(`Não foi possível estabelecer uma conexão ao banco de dados: ${error.stack}`);
            return;
        }
        else{
            console.log("Banco de dados conectado com sucesso!");
        }
    })
};
function disconnect(){
    connection.end((error) => {
        if(error){
            console.error(`Erro ao encerrar conexão com o banco de dados: ${error.stack}`);
            return;
        }
        else{
            console.log("A conexão foi encerrada com sucesso.");
        }
    })
};
async function consultUser(){
    try {
        const [result] = await connection.promise().query('SELECT * FROM users');
        return result;
    }
    catch (error) {
        console.error(`Erro ao consultar a tabela: ${error.stack}`);
        throw error;
    }
};
async function insertUser(nome, cpf){
    try {
        const [result] = await connection.promise().query(`INSERT INTO user(nome, cpf) VALUES("${nome}", "${cpf}");`)
        return result;
    }
    catch (error) {
        console.error(`Erro ao inserir um usuário: ${error.stack}`);
        throw error;
    }
};
async function searchUserByCPF(cpf){
    try {
        const result = await connection.promise().query(`SELECT * FROM users WHERE cpf = "${cpf}"`);
        if(result){
            return result.nome, result.cpf;
        }
        else{
            return null;
        }
    }
    catch (error) {
        console.error(`Não foi possível consultar o usuário: ${error.stack}`);
        return null;
    }
};
module.exports = {connect, disconnect, consultUser, insertUser};