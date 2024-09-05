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
        const [queryResult] = await connection.promise().query(`UPDATE atendimento SET ${setClauseString} WHERE atendimento_id = ${appointmentId};`);
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
// função para inserir uma consulta no banco de dados
// obs.: a consulta deve ser inserida após a sua conclusão e após a inserção do paciente atendido
async function inserirConsulta(profissionalId, pacienteId, dataConsulta, horarioInicio, horarioFim, descricao){
    try {
        const [result] = await connection.promise().query(`INSERT INTO consulta(profissional_id, paciente_id, data_consulta, horario_inicio, horario_fim, descricao) VALUES("${profissionalId}", "${pacienteId}", "${dataConsulta}", "${horarioInicio}", "${horarioFim}", "${descricao}");`);
        return result;
    }
    catch (error) {
        console.error(`Erro ao inserir uma ocorrência na tabela consulta: ${error.stack}`)
    }
}
// função para inserir um paciente no banco de dados
// obs.: o paciente deve ser inserido após a conclusão de uma consulta
async function insertPatient(name, cpf){
    try {
        const [result] = await connection.promise().query(`INSERT INTO paciente(nome, cpf) VALUES("${name}", "${cpf}");`);
        return result;
    }
    catch (error) {
        console.error(`Erro ao inserir uma ocorrência na tabela paciente: ${error.stack}`)
    }
};
// função que retorna o id do paciente
async function returnsPatientId(patientName){
    try {
        const [result] = await connection.promise().query(`SELECT paciente_id FROM paciente WHERE nome ILIKE "${patientName}"`);
        return result;
    }
    catch (error) {
        console.error(`Não foi possível retornar o id do paciente: ${error.stack}`);
    }
};
module.exports = {connect, disconnect, insertAppointment, updateAppointment /*, consultUser, insertUser*/};