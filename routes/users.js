var express = require('express');
var router = express.Router();

/* GET user admin home page. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Página do admin' });
});

/* adiciona paciente à fila com método POST */
// to-do: terminar a função
router.post('/newUser', function(req, res){
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

module.exports = router;
