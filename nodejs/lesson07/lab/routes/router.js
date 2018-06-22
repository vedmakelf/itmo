var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var arrHesh = [];

router.post('/authorization', function(req, res, next) {
    if (req.body.login === user.login && req.body.password === user.password) {
        var hesh = genCrypto(req.body.login, req.body.password);
        arrHesh.push(hesh);
        res.cookie('id', hesh, {expires: new Date(Date.now() + 60000), httpOnly: true});
        res.send(JSON.stringify({
            authorization: true
        }));
    } else {
        res.send(JSON.stringify({
            authorization: false
        }));
    }
});

router.use('/clear', function (req, res, next) {
    if (req.cookies.id) {
        var index = arrHesh.indexOf(req.cookies.id);
        res.cookie('id', arrHesh[index], { expires: new Date(Date.now() + 0), httpOnly: true });
        arrHesh.splice(index, 1);
        res.redirect('./');
    } else {
        res.redirect('./');
    }
});

router.use('/', function (req, res, next) {
    switch (true) {
        case chekHash(req.cookies.id) && req.url === '/':
            res.redirect('./main.html');
            break;
        case !chekHash(req.cookies.id) && req.url === '/main.html':
            res.redirect('./');
            break;
        default:
            next();
            break;
    }
});

module.exports = router;

function genCrypto(login, password) {
    return crypto.createHash('md5')
        .update(login)
        .update(password)
        .digest('hex');
};

var user = {
    login: 'root',
    password: 'root'
};

function chekHash(hash) {
    if (arrHesh.indexOf(hash) === -1) {
        return false;
    } else {
        return true
    }
}