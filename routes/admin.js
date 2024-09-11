var express = require('express');
var router = express.Router();
var mongodb = require('../mongodb');
/* GET user admin home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Página do admin' });
});
/* adiciona paciente à fila com método POST */
// to-do: terminar a função
router.post('/newPatient', function(req, res){
    const {} = req.body;
    return;
})  
/* cadastra atendimento no banco de dados usando POST */
// to-do: terminar a função
router.post('/newAppointment', function(req, res){
  const {name, crm, date} = req.body;
  if (name == '' || crm == '' || date == ''){
    res.render();
  }
  else{
    let appointment = mysql.insertAppointment(name, crm, date);
    if (cadastro){
      res.send('appointment registered with sucess!')
    }
  }
})
// criação de novo admin
// obs.: utilizar uma vez só
router.post('/newAdmin', async(req, res)=>{
    let login = req.body.login;
    let senha = req.body.senha;
    try {
        mongodb.insertAdmin(login, senha);
        res.send("Funcionario adicionado com sucesso!");
    }
    catch (error) {
        res.status(500).json({error:error});
    }
})
module.exports = router;