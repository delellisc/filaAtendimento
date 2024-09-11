var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = require('./mongodb');
// var mysql = require('./mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// objetos json abaixo feitos apenas para teste
let user3 = {
  "name": "Medeiros",
  "cpf": "456",
  "id": 3,
  "status": "Ok",
  "priority": 0,
  "next": null
};
let user2 = {
  "name": "de Lellis",
  "cpf": "789",
  "id": 2,
  "status": "Ok",
  "priority": 0,
  "next": user3
};
let user1 = {
  "name": "Camilo",
  "cpf": "123",
  "id": 1,
  "status": "Ok",
  "priority": 0,
  "next": user2
};
let testJson =  {
  "start": user1,
  "end": user3,
  "length": 3,
  "idCounter": 4
};
// funções de teste
mongodb.connectMongo();
// mongodb.insertAdmin('admin', '123');
// mongodb.insertQueue(testJson);
mongodb.modifyQueue(testJson);
// mysql.updateAppointment(1, 6, '05-09-2024', '10:30', '12:00');

module.exports = app;
