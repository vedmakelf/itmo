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

    switch (request.method) {
        case 'GET':
            switch (extname) {
                case ".gif": case ".jpg": case ".ico":
                    var img = fs.readFileSync('./' + pathname);
                    response.writeHead(200, { 'Content-Type': mimeType });
                    response.end(img, 'binary');
                    break;
                case ".json":
                    fs.readFile(pathname, 'utf8', function (err, data) {
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
                    fs.readFile(pathname, 'utf8', function (err, data) {
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
            break;
        case 'POST':
            if (!fs.existsSync('file')) {
                fs.mkdirSync('file');
            }
            //var newFileStream = fs.createWriteStream('file/' + pathname);
            var str = '';
            request
                .on('data', function (chunk) {
                    //newFileStream.write(chunk);
                    str += chunk.toString();
                })
                .on('end', function () {
                    var arr = str.split('\n');
                    var obj = {};
                    for (var i = 0; i < arr.length; i++) {
                        if (!arr
                            || 0 === arr[i].length
                            || '' === arr[i]) {
                            continue;
                        } else {
                            switch (i) {
                                case 0:
                                    var buffer = arr[0].split(' ');
                                    switch (buffer[0]) {
                                        case 'GET':
                                            if (buffer.length === 3) {
                                                obj['uri'] = buffer[1].toString().trim();
                                                obj['method'] = buffer[0].toString().trim();
                                                obj['protocol'] = buffer[2].toString().trim();
                                            }
                                            break;
                                        default:
                                            switch (buffer.length) {
                                                case 3:
                                                    obj['protocol'] = buffer[0].toString().trim();
                                                    obj['status_code'] = buffer[1].toString().trim();
                                                    obj['status_message'] = buffer[2].toString().trim();
                                                    break;
                                                case 4:
                                                    obj['protocol'] = buffer[0].toString().trim();
                                                    obj['status_code'] = buffer[1].toString().trim();
                                                    obj['status_message'] = `${buffer[2]} ${buffer[3]}`.toString().trim();
                                                    break;
                                                default:
                                                    break;
                                            }
                                            break;
                                    }
                                    break;
                                default:
                                    var buffer = arr[i].split(':');
                                    if (buffer.length > 1) {
                                        obj[buffer[0]] = buffer[1].toString().trim();
                                    }
                                    break;
                            }
                        }
                    }
                    //newFileStream.end();
                    var t = JSON.stringify(obj);
                    fs.writeFile('file/' + pathname.replace('.txt', '.json'), JSON.stringify(obj, null, '\t'), (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                        }
                    });
                    response.writeHead(200);
                    response.end();
                });
            break;
        default:
            break;
    }

}).listen(8080, () => {
    console.log('start server');
    });