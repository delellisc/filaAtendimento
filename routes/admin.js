var express = require('express');
var router = express.Router();
var mongodb = require('../mongodb');
var linkedList = require('../linkedListScript');
const Queue = require('../models/queue');
//var mysql = require('../mysql');
/* GET user admin home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Página do admin' });
});
/* adiciona paciente à fila com método POST */
// to-do: terminar a função
// to-do: tentar utilzar os métodos da classe "Queue"
// no objeto json retornado pelo mongodb
router.post('/newPatient', async function(req, res){
    const {nome, cpf} = req.body;
    if (nome == '' || cpf == ''){
      res.render();
    }
    else{
      let objetoFila = await mongodb.returnQueue();
      fila = objetoFila[0].queueHead;
      if (fila.length > 0){
        console.log(fila);
        res.send('Paciente adicionado');
      }
      else{
        fila = new Queue();
        fila.addNextUser(nome, cpf, 0);
        mongodb.insertQueue(fila);
        res.send('Fila criada')
      }
    }
});
/* cadastra atendimento no banco de dados usando POST */
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
// criação de novo admin
// obs.: utilizar uma vez só
router.post('/newAdmin', async(req, res)=>{
    const {login, senha} = req.body;
    try {
        mongodb.insertAdmin(login, senha);
        res.send("Funcionario adicionado com sucesso!");
    }
    catch (error) {
        res.status(500).json({error:error});
    }
});
module.exports = router;