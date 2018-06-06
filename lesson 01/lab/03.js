var fs = require('fs');
var http = require('http');
var fileName = 'index.html';

function responser(request, response) {
    //fs.readFile(fileName, 'utf8', function (err, data) {
    //    if (err) {
    //        console.log('Could not find or open file for reading\n');
    //    } else {
    //        response.writeHead(200, { 'Content-Type': 'text/html' });
    //        response.end(data);
    //    }
    //});

    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('header.html', 'utf8', function (err, data) {
        response.write(data);
        fs.readFile('body.html', 'utf8', function (err, data) {
            response.write(data);
            fs.readFile('footer.html', 'utf8', function (err, data) {
                response.end(data);
            });
        });
    });

}

var server = http.createServer(responser);

server.listen(8080);

console.log('server running on 8080')