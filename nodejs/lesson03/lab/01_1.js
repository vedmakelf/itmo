var http = require("http");
var fs = require('fs');
var language;

http.createServer((request, response) => {
    switch (language) {
        case 'en':
            var file = 'en.html'
            break;
        default:
            var file = 'ru.html'
            break;
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
    language = process.argv[2];
    console.log('start server');
});