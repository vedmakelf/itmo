var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session');
var crypto = require('crypto');
var mustacheExpress = require('mustache-express');

var app = express()

app.use(express.json());
app.use(express.urlencoded());

app.set('views', './views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(cookieParser())

app.listen(8080, (error) =>{
    console.log(`star server; port: 8080`);
});

var userRout = require('./routes/router.js');
app.use('/admin', userRout);

app.use(express.static('public'));