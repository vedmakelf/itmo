var http = require('http');

function responser(request, response) {
    console.log('HTTP works');
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write('<h1>hello!</h1>');
    response.end()

}

var server = http.createServer(responser);

server.listen(8080);