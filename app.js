var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Pool } = require('pg');

var app = express();

// connect to local database postgresql
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'web-express',
    password: 'ovulasi72144',
    port: 5432,
});

var indexRouter = require('./routes/Users/index')(pool);
var usersRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/getUsers', indexRouter);
app.use('/users', usersRouter);

console.log('Server listening on port 3000');

module.exports = app;
