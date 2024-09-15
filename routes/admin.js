var express = require('express');
var router = express.Router();
var mongodb = require('../mongodb');
var linkedList = require('../linkedListScript');
const Queue = require('../models/queue');
// to-do: conectar ao banco de dados relacional
// var mysql = require('../mysql');
/* GET user admin home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Página do admin' });
});
// adiciona paciente à fila com método POST
// to-do: terminar a função
// to-do: método "addNextUser" não está funcionando como o esperado
router.post('/newPatient', async function(req, res){
    const {nome, cpf} = req.body;
    if (nome == '' || cpf == ''){
      res.render();
    }
    else{
      let resposta = await mongodb.returnQueue();
      let fila = new linkedList.Queue();
      if (resposta){
        let objetoFila = resposta[0].queueHead; 
        fila.start = objetoFila.start
        fila.end = objetoFila.end
        fila.length = objetoFila.length
        fila.idCounter = objetoFila.idCounter;
        fila.addNextUser(nome, cpf, 0);
        // console.log(fila);
        fila.printQueue();
        mongodb.modifyQueue(fila);
        res.send('Paciente adicionado');
      }
      else{
        fila.addNextUser(nome, cpf, 0);
        mongodb.insertQueue(fila);
        res.send('Fila criada')
      }
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
// to-do: terminar a função
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