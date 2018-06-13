var http = require("http");
var fs = require('fs');

http.createServer((request, response) => {
    if (process.env.LANG) {
        switch (process.env.LANG) {
            case 'en_EN':
                var file = 'en.html'
                break;
            case 'ru_RU':
                var file = 'ru.html'
                break;
        }
    } else {
        console.log('не установленна переменная LANG');
        response.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end('<p>не установленна переменная LANG</p>');
        return;
    }
    fs.readFile(file, 'utf8', function (error, data) {
        if (error) {
            console.log( 'Could not find or open file for reading\n');
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        }
    });
}).listen(8080, () => {
    console.log('start server');
});