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
            console.log("Banco de dados relacional conectado com sucesso!");
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
// função para inserir um paciente no banco de dados
// obs.: o paciente deve ser inserido após a conclusão de uma consulta
async function insertPatient(name, cpf){
    try {
        const [search] = await connection.promise().query(`SELECT * FROM paciente WHERE cpf = "${cpf}";`);;
        if (search.length < 1){
            await connection.promise().query(`INSERT INTO paciente(nome, cpf) VALUES("${name}", "${cpf}");`);
        }
        else{
            console.error('Paciente já cadastrado')
        }
    }
    catch (error) {
        console.error(`Erro ao inserir uma ocorrência na tabela paciente: ${error.stack}`)
    }
};
// função que retorna o id do paciente
async function returnsPatientId(patientName){
    try {
        const [result] = await connection.promise().query(`SELECT cpf FROM paciente WHERE LOWER(nome) = LOWER(?)`, [patientName]);
        if (result.length > 0){
            return result[0];
        }
        else{
            console.error(`Paciente não encontrado`);
        }
    }
    catch (error) {
        console.error(`Não foi possível retornar o id do paciente: ${error.stack}`);
    }
};
// função para inserção de um atendimento no banco de dados
async function insertAppointment(crm, appointmentDate){
    try {
        const [queryResult] = await connection.promise().query(`INSERT INTO atendimento(crm, data_atendimento) VALUES("${crm}", "${appointmentDate}");`);
        console.log(queryResult);
        return queryResult;
    } 
    catch (error) {
        console.error(`Erro ao inserir a ocorrência: ${error.stack}`);
        throw error;
    }
};
// função para atualização de um atendimento no banco de dados
async function updateAppointment(appointmentId, crm, appointmentDate){
    if (isNaN(appointmentId)){
        res.render();
    }
    try {
        let setClause = [];
        if (crm != ''){
            setClause.push(`crm = ${crm}`);
        }
        if (appointmentDate != ''){
            setClause.push(`data_consulta = ${appointmentDate}`);
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
// função que retorna atendimentos
async function returnTodayAppointments(){
    try {
        const [query] = await connection.promise().query('SELECT a.atendimento_id, a.crm, e.especialidade FROM atendimento a INNER JOIN profissional p ON a.crm = p.crm INNER JOIN especialidade e ON e.especialidade_id = p.especialidade_id WHERE DATE(a.data_atendimento) = CURDATE();');
        return query;
    }
    catch (error) {
        console.error(`Erro ao retornar atendimentos: ${error.stack}`);
    }
}
// retorna atendimento de especialidade
async function returnSpecialityAppointment(especialidade){
    try {
        let [appointment] = await connection.promise().query(`SELECT a.atendimento_id, a.crm, e.especialidade FROM atendimento a INNER JOIN profissional p ON a.crm = p.crm INNER JOIN especialidade e ON e.especialidade_id = p.especialidade_id WHERE DATE(a.data_atendimento) = CURDATE() AND e.especialidade = '${especialidade}';`)
        return appointment;
    }
    catch (error) {
        console.error(`Erro ao retornar atendimentos: ${error.stack}`);
    }
};
// insere um médico
async function insertProfessional(nome, especialidade, crm){
    try {
        const [query1] = await connection.promise().query(`SELECT especialidade_id FROM especialidade WHERE especialidade = '${especialidade}';`);
        const [query2] = await connection.promise().query(`INSERT INTO profissional(crm, especialidade_id, nome) VALUES ("${crm}", "${query1[0].especialidade_id}", "${nome}");`);
        console.log(query2, nome, crm);
    } 
    catch (error) {
        console.error(`Erro ao inserir o médico: ${error.stack}`);
    }
};
// retorna id do médico
async function returnCRM(){
    try {
        const [crm] = await connection.promise().query(`SELECT crm FROM profissional;`);
        return crm;
    }
    catch (error) {
        console.error(`Erro ao adquirir CRMs: ${error.stack}`);
        throw error;
    }
};
// retorna todas as especialidades
async function returnSpeciality(){
    try {
        const [especialidade] = await connection.promise().query(`SELECT especialidade FROM especialidade;`);
        return especialidade;
    }
    catch (error) {
        console.error(`Erro ao adquirir especialidades: ${error.stack}`);
        throw error;
    }
};
// função para inserir uma consulta no banco de dados
// obs.: a consulta deve ser inserida após a sua conclusão e após a inserção do paciente atendido
async function insertConsultation(cpf, especialidade){
    try {
        const appointments = await returnSpecialityAppointment(especialidade)
        const appointment = appointments[0];
        const [query] = await connection.promise().query(`INSERT INTO consulta(crm, cpf, atendimento_id) VALUES("${appointment.crm}", "${cpf}", "${appointment.atendimento_id}");`);
        return query;
    }
    catch (error) {
        console.error(`Erro ao inserir uma ocorrência na tabela consulta: ${error.stack}`)
    }
}
module.exports = {connect, disconnect, insertAppointment, updateAppointment, returnSpeciality, returnTodayAppointments, returnsPatientId, insertPatient, insertConsultation, insertProfessional, returnCRM};