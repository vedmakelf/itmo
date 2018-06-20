var express = require('express');
var bodyParser = require('body-parser')
var mustacheExpress = require('mustache-express');
var path = require('path');
var app = express();

app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.listen(8000);

app.use(express.json());
app.use(express.urlencoded());


app.use(express.static(path.join(__dirname, 'public')));

var userRout = require('./routes/index.js');

app.use('/ajaxservice/get', function (req, res, next) {
    console.log(req.body);
    var data = [{ name: 'Peter', data: 'bla-bla' }, { name: 'Vasiliy', data: 'ps...' }];
    res.send(JSON.stringify(data));
})
app.use('/', userRout);