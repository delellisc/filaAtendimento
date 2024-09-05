const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ifrn.cn",
    database: "fila_atendimento"
});
// função para estabelecer uma conexão com o banco de dados
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
// função para encerrar uma conexão com o banco de dados
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
// função para inserção de um atendimento no banco de dados
async function insertAppointment(professionalId, appointmentDate, appointmentStartTime, appointmentEndTime){
    try {
        const [queryResult] = await connection.promise().query(`INSERT INTO atendimento(profissional_id, data_atendimento, horario_inicio, horario_fim) VALUES("${professionalId}", "${appointmentDate}", "${appointmentStartTime}, "${appointmentEndTime}");`);
        return queryResult;
    } 
    catch (error) {
        console.error(`Erro ao inserir a ocorrência: ${error.stack}`);
        throw error;
    }
};
// função para atualização de um atendimento no banco de dados
async function updateAppointment(appointmentId, professionalId, appointmentDate, appointmentStartTime, appointmentEndTime){
    try {
        let setClause = [];
        if (professionalId != ''){
            setClause.push(`profissional_id = ${professionalId}`);
        }
        if (appointmentDate != ''){
            setClause.push(`data_consulta = ${appointmentDate}`);
        }
        if (appointmentStartTime != ''){
            setClause.push(`horario_inicio = ${appointmentStartTime}`);            
        }
        if (appointmentEndTime){
            setClause.push(`horario_fim = ${appointmentEndTime}`);
        }
        let setClauseString = setClause.join(", ")
        const [queryResult] = await connection.promise().query(`UPDATE atendimento SET ${setClauseString} WHERE atendimento_id = ${appointmentId}`);
        return queryResult;
    }
    catch (error){
        console.error(`Erro ao atualizar a ocorrência: ${error.stack}`);
        throw error;
    }
};
// retorna id do médico a partir do nome
async function returnsProfessionalId(professionalName){
    try {
        const professionalId = await connection.promise().query(`SELECT profissional_id FROM profissional WHERE nome ILIKE "${professionalName}";`);
        return professionalId;
    }
    catch (error) {
        console.error(`Erro ao adquirir id do profissional: ${error.stack}`);
        throw error;
    }
}
/*
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
*/
module.exports = {connect, disconnect, insertAppointment, updateAppointment /*, consultUser, insertUser*/};