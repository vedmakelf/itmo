var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mysql = require('mysql');

var arrHesh = [];

router.post('/authorization', function(req, res, next) {
    getUser(connection, `select * from user where login = '${req.body.login}' and pass = '${req.body.password}'`)
        .then((result) => {
            if (result) {
                var hesh = genCrypto(result[0].login, result[0].pass);
                arrHesh[hesh] = result[0].id;
                res.cookie('id',  hesh,  { expires: new  Date(Date.now() + 60000), httpOnly: true });
                res.send(JSON.stringify({
                    authorization: true
                }));
            } else {
                res.send(JSON.stringify({
                    authorization  : false
                }));
            }
        })
        .catch((err) => {
            console.error(err);
        });
});

router.use('/clear', function (req, res, next) {
    if (req.cookies.id) {
        res.cookie('id', arrHesh[req.cookies.id], { expires: new Date(Date.now() + 0), httpOnly: true });
        delete arrHesh[req.cookies.id];
        res.redirect('./');
    } else {
        res.redirect('./');
    }
});

router.use('/editUser', function (req, res, next) {
    if (req.cookies.id) {
        getUser(connection, `update user set login = '${req.body.login}', pass = '${req.body.password}', email = '${req.body.email}' where id = '${arrHesh[req.cookies.id]}';`)
            .then((result) => {
                res.send(JSON.stringify({
                    edit: true
                }));
            })
            .catch((err) => {
                console.error(err);
                res.send(JSON.stringify({
                    edit: false
                }));
            });
    } else {
        res.redirect('./');
    }
});

router.use('/addUser', function (req, res, next) {
    if (req.cookies.id) {
        getUser(connection, `INSERT INTO user (login, pass, email) VALUES ('${req.body.login}', '${req.body.password}', '${req.body.email}')`)
            .then((result) => {
                res.send(JSON.stringify({
                    edit: true
                }));
            })
            .catch((err) => {
                console.error(err);
                res.send(JSON.stringify({
                    edit: false
                }));
            });
    } else {
        res.redirect('./');
    }
});

router.use('/', function (req, res, next) {
    switch (true) {
        case chekHash(req.cookies.id) && req.url === '/':
            res.redirect('./main');
            break;
        case !chekHash(req.cookies.id) && req.url === '/main':
            res.redirect('./');
            break;
        default:
            next();
            break;
    }
});

router.use('/main', function (req, res, next) {
    getUser(connection, `select * from user where id = '${arrHesh[req.cookies.id]}'`)
        .then((result) => {
            if (result) {
                res.render('admin/main', {
                    login: `${result[0].login}`,
                    Email: `${result[0].email}`,
                    Password: `${result[0].pass}`
                });
            } else {
            }
        })
        .catch((err) => {
            console.error(err);
        });
});

module.exports = router;

function genCrypto(login, password) {
    return crypto.createHash('md5')
        .update(login)
        .update(password)
        .digest('hex');
};

function chekHash(hash) {
    if (arrHesh[hash] === undefined) {
        return false;
    } else {
        return true
    }
}

/**
 * 
 * @param {any} connect
 * @param {any} user
 * @param {any} password
 */
function getUser(connect, sqlQuery) {
    return new Promise((resolve, reject) => {
        connect = mysql.createConnection(connect);
        connect.query(sqlQuery, (err, rows, fields) => {
            switch (true) {
                case rows.length == 0:
                    resolve(false);
                    break;
                case rows.length != 0:
                    resolve(rows);
                    break;
                case err:
                    reject(err);
                    break;
            }
        });
        connect.end();
    });
};

var connection = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysite'
};