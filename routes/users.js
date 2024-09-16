var express = require('express');
var router = express.Router();
var mongodb = require('../mongodb');

/* GET user admin home page. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Página do usuário' });
});
// consultar posiçao na fila
router.get('/checkPosition/:pacienteId', async function(req, res){
  const pacienteId = parseInt(req.params.pacienteId);
  let position = await mongodb.returnId(pacienteId);
  if (isNaN(pacienteId)){
    return res.render('error', { message: 'Paciente ID inválido' });
  }
  else{
    res.send(`${position}`);
  }
})
// consultar posição na fila
router.get('/:pacienteId', async function(req, res) {
  const pacienteId = parseInt(req.params.pacienteId);
  if (isNaN(pacienteId)) {
    return res.render('error', { message: 'Paciente ID inválido' });
  }
  try {
    res.render('users', { title: 'Página do usuário', pacienteId: `${pacienteId}`});
  }
  catch (error) {
    res.status(500).json({ error: 'Erro no servidor', details: error });
  }
});
// login
router.get('/login', async(req, res)=>{
  const {login, senha} = req.body;
  if (login == '' || senha == ''){
    res.render();
  }
  else{
    try {
        let validade = await mongodb.login(login, senha);
        if (validade){
          res.render('admin', { title: 'Página do admin' });
        }
        else{
          res.send("Não foi possível efetuar o login.");
        }
    }
    catch (error) {
        res.status(500).json({error:error});
    }
  }
});

module.exports = router;