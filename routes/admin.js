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
router.post('/newPatient', async function(req, res){
  const {nome, cpf, especialidade} = req.body;
  console.log(nome, cpf)
  if (nome == '' || cpf == '' || especialidade == ''){
    res.render('error', { message: 'Todos os campos devem ser preenchidos!' });
  }
  else{
    let resposta = await mongodb.returnQueue(especialidade);
    if (resposta){
      let objeto = resposta[0];
      let fila = linkedList.createQueueByJSONObject(objeto.queueHead);
      fila.addNextUser(nome, cpf, 0);
      fila.printQueue();
      mongodb.modifyQueue(fila, especialidade);
      res.render('Paciente adicionado');
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
router.post('/removeTopPatient', async(req, res)=>{
  const {especialidade} = req.body;
  try {
    let patient = await mongodb.removeTopPatient(especialidade);
    await mysql.insertPatient(patient.name, patient.cpf);
    await mysql.insertConsultation(patient.cpf, especialidade);
    res.send();
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
    res.render('error', { message: 'Todos os campos devem ser preenchidos!' });
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
router.post('/newAppointment', function(req, res){
  const {crm, data} = req.body;
  if (crm == '' || data == ''){
    res.render('error', { message: 'Todos os campos devem ser preenchidos!' });
  }
  else{
    let appointment = mysql.insertAppointment(crm, data);
    if (appointment){
      res.send('Atendimento cadastrado com sucesso!');
    }
    else{
      res.send('Não foi possível cadastrar o atendimento');
    }
  }
});
// insere um novo médico
router.post('/newProfessional', async function (req, res) {
  const { nome, crm, especialidade } = req.body;
  if (nome == '' || crm == '' || especialidade == '') {
      res.render('error', { message: 'Todos os campos devem ser preenchidos!' });
  } else {
      const result = await mysql.insertProfessional(nome, especialidade, crm);
      if (result) {
          res.send('Médico cadastrado com sucesso!');
      }
      else {
          res.send('Não foi possível cadastrar o médico.');
      }
  }
});
// consultar posiçao na fila
router.get('/showAppointments', async function(req, res){
  const resultado = await mysql.returnTodayAppointments();
  if(resultado){
    res.send(`${resultado}`);
  }
  else{
    res.render('error', { message: 'Paciente ID inválido' });
  }
})
module.exports = router;