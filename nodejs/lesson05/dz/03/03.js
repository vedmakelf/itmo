var express = require('express');
var bodyParser = require('body-parser')
let calc = require('./calc.js');
var app = express();

app.use(express.json());
app.use(express.urlencoded());

app.listen(8000);

app.use('/calc', (req, res, next) => {
    var data = req.body['value'];
    var resultConvert = calc.convert(data);
    console.log(`исходное вырожение: ${data}, ОПН: ${resultConvert}`)
    var result = calc.calc(resultConvert);
    console.log(`выходные данные: ${result}`)
    res.send(result.toString());
});

app.use(express.static('./'));