var express = require('express');
var router = express.Router();
var mongodb = require('../mongodb');

/* GET user admin home page. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Página do usuário' });
});

// consultar posição na fila
router.get('/getPosition', async function(req, res) {
  const {pacienteId} = req.body;
  if (pacienteId == null){
    res.render();
  }
  else{
    try {
      let position = await mongodb.returnId(id);
      console.log(position)
      res.send(position);
    }
    catch (error) {
      res.status(500).json({error:error});
    }
  };
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