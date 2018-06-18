var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var key = 'aS8R0VDrdRQRWvIa8OelJ0QPqyegdk';

app.use(express.json());
app.use(express.urlencoded());

app.listen(8000);

app.post('/scripts/test_task/api_sample', (req, res, next) => {
    var data = req.body['method'];
    switch (data) {
        case 'get_api_key':
            res.set({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            var data = {
                key: key,
                ip: req.connection.remoteAddress
            }
            res.send(JSON.stringify(data));
            break;
        case 'send_lead':
            res.set({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            var data = {
                status: 'success',
                message: 'lead was successfully sent',
                data: {
                    name: req.body['name,'],
                    phone: req.body['phone'],
                    ip: req.body['ip']
                },
                key: req.body['key']
            }
            res.send(JSON.stringify(data));
            break;
        default:
            break;
    }
    res.send();
});

app.use(express.static('./'));