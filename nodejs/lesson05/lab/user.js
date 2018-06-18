var express = require('express');
var router = express.Router();

router.get('/add', function(req, res, next) {
    res.send('add user');
});

router.post('/registration', function(req, res, next) {
    var data = req.body;
    console.log(data);
    res.render('registrationNotice', { registrationNotice: `${data['login']} успешно зарегистрирован` });
});

module.exports = router;