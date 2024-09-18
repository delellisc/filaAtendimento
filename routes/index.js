var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('paginaInicial', { title: 'Fila de atendimento' });
});

/* GET login page. */
router.get('/loginpage', (req, res) => {
  console.log("Acessou a rota /loginpage");
  res.render('login', { title: 'LOGIN' });
})
module.exports = router;
