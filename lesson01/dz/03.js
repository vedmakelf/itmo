var http = require('http');
var fs = require('fs');
var error404 = '404.html';

http.createServer((request, response) => {
    fs.readFile(request.url.substr(1), function (err, data) {
        if (err) {
            console.log('Could not find or open file for reading\n');
            response.writeHead(404, { 'Content-Type': 'text/html' });
            fs.readFile(error404, 'utf8', function (err, data) {
                response.end(data);
            });
        } else {
            response.writeHead(200);
            response.end(data);
        }
    });
}).listen(8080, () => {
    console.log('start server');
 });