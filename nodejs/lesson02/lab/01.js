var  http  =  require("http");
var  fs  =  require('fs');
var url = require("url");
var path = require("path");

http.createServer((request, response) => {
    var pathname = url.parse(request.url).path;
    //console.log(`Получен запрос ${pathname}`);
    if (pathname == "/") {
        pathname = "/index.html"
    }
    var extname = path.extname(pathname);
    var mimeType = mimeTypes[path.extname(pathname)];
    pathname = pathname.substring(1, pathname.length);
    if (extname == ".gif"
        || extname == ".jpg") {
        var img = fs.readFileSync(pathname);
        response.writeHead(200, { 'Content-Type': mimeType });
        response.end(img);
    } else {
        fs.readFile(pathname, 'utf8', function (error, data) {
            if (error) {
                console.log( 'Could not find or open file for reading\n');
            } else {
                response.writeHead(200, { 'Content-Type': mimeType });
                response.end(data);
            }
        });
    }
}).listen(8080, () => {
    console.log('start server');
    });

var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css' :  'text/css',
    '.jpg' :  'image/jpeg',
    '.gif' :  'image/gif'
};