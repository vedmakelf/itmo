var express = require('express');
var path = require('path');
var app = express();

app.listen(8000);


app.use(express.static(path.join(__dirname,  'public')));