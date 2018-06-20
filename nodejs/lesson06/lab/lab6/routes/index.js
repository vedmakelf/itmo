var express = require('express');
var fs = require('fs');
var router = express.Router();

router.use('/', function(req, res, next) {
    res.render('index', { title: 'LOL' });
});

module.exports = router;