const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const logger = require('morgan');
const connection = require('express-myconnection');
const mysql = require('mysql');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// Vistas setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Conexion con base de datos
con = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'romanos18',
    port: 3306, //puerto mysql
    database: 'basefinalnode'
});

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

module.exports = app;