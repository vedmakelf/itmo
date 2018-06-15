let DB = require('./model.js');

var collectionUsers = new DB('user.json');
collectionUsers.addData({ login: 'sasha', password: '1234' });
collectionUsers.addData({ login: 'admin', password: 'root' });
collectionUsers.write(function (err) {
    if (err) console.log(err);
    console.log('Данные записаны!');
});

var collectionUsers = new DB('user.json');
collectionUsers.read(function (err) {
    if ((err)) {
        console.log(err);
    } else {
        var obj = collectionUsers.findDataByPropery('login', 'admin')
        console.log(obj);
    }
});