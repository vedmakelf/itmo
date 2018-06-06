var http = require('http');

function responser(request, response) {
    console.log('HTTP works');
}

var server = http.createServer(responser);

server.listen(8080);