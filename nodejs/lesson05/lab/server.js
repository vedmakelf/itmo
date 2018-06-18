var express = require('express');
var bodyParser = require('body-parser')
var mustacheExpress = require('mustache-express');
var app = express();

app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.listen(8000);

app.use(express.json());
app.use(express.urlencoded());

var userRout = require('./user.js');

app.use('/user', userRout);

app.use(express.static('./'));