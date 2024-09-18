var express = require('express');
var router = express.Router();
var mongodb = require('../mongodb');
var linkedList = require('../linkedListScript');
const Queue = require('../models/queue');
var mysql = require('../mysql');
// renderiza página do admin
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Página do admin' });
});
// adiciona paciente à fila com método POST
router.post('/:especialidade/newPatient', async function(req, res){
  const especialidade = req.params.especialidade;
  const {nome, cpf} = req.body;
  console.log(nome, cpf)
  if (nome == '' || cpf == '' || especialidade == ''){
    res.render();
  }
  else{
    let resposta = await mongodb.returnQueue(especialidade);
    if (resposta){
      let objeto = resposta[0];
      let fila = linkedList.createQueueByJSONObject(objeto.queueHead);
      fila.addNextUser(nome, cpf, 0);
      fila.printQueue();
      mongodb.modifyQueue(fila, especialidade);
      res.render('fila', {title: `Gerencimanto da fila ${especialidade}`, fila});
    }
    else{
      let fila = new linkedList.Queue();
      fila.addNextUser(nome, cpf, 0);
      fila.printQueue();
      mongodb.insertQueue(fila, especialidade);
      res.send('Fila criada')
    }
  }
});
// remove o paciente no topo da fila
// cadastra a consulta no banco de dados relacional
router.post('/:especialidade/removeTopPatient', async(req, res)=>{
  const especialidade = req.params.especialidade;
  try {
    let patient = await mongodb.removeTopPatient(especialidade);
    await mysql.insertPatient(patient.name, patient.cpf);
    await mysql.insertConsultation(patient.cpf, especialidade);
    res.send(`Paciente removido: ${patient.name}`);
  }
  catch (error) {
    res.status(500).json({error:error});
  }
});
// espera por paciente
router.post('/waitForPatient', async(req, res)=>{
  const {patientId, especialidade} = req.body;
  try {
    mongodb.waitForPatient(patientId, especialidade);
    res.send("Status do paciente alterado");
  }
  catch (error) {
    res.status(500).json({error:error});
  }
});
// criação de novo admin
// obs.: utilizar uma vez só
router.post('/newAdmin', async(req, res)=>{
  const {login, senha} = req.body;
  if (login == '' || senha == ''){
    res.render();
  }
  else{
    try {
        mongodb.insertAdmin(login, senha);
        res.send("Funcionario adicionado com sucesso!");
    }
    catch (error) {
        res.status(500).json({error:error});
    }
  }
});
// cadastra atendimento no banco de dados usando POST
// *** NÃO NECESSÁRIA ***
router.post('/newAppointment', function(req, res){
  const {nome, crm, data} = req.body;
  if (nome == '' || crm == '' || data == ''){
    res.render();
  }
  else{
    let appointment = mysql.insertAppointment(nome, crm, data);
    if (appointment){
      res.send('Atendimento cadastrado com sucesso!');
    }
    else{
      res.send('Não foi possível cadastrar o atendimento');
    }
  }
});
module.exports = router;