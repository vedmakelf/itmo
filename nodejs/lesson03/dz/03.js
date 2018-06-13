var http = require("http");
var fs = require('fs');
var url = require("url");
var path = require('path');

var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

http.createServer((request, response) => {
    var postData = "";
    var pathname = url.parse(request.url).path;
    if (pathname == '/')
        pathname = '/index.html';
    var extname = path.extname(pathname);
    var mimeType = mimeTypes[extname];
    pathname = pathname.substring(1, pathname.length);

    switch (extname) {
        case ".gif": case ".jpg": case ".ico":
            var img = fs.readFileSync('./' + pathname);
            response.writeHead(200, { 'Content-Type': mimeType });
            response.end(img, 'binary');
            break;
        case ".json":
            fs.readFile(pathname, 'utf8',  function  (err,  data) {
                if (err) {
                    console.log('Could not find or open file ' +
                        pathname + ' for reading\n');
                } else {
                    response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    response.end(data);
                }
            });
            break;
        default:
            fs.readFile(pathname, 'utf8',  function  (err,  data) {
                if (err) {
                    console.log('Could not find or open file ' +
                        pathname + ' for reading\n');
                } else {
                    response.writeHead(200, { 'Content-Type': mimeType });
                    response.end(data);
                }
            });
            break;
    }

}).listen(8080, () => {
    console.log('start server');
    });