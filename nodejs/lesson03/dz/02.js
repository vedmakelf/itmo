var http = require("http");
var url = require("url");

http.createServer((request, response) => {
    var pathname = url.parse(request.url, true).pathname.substr(1);
    var query = url.parse(request.url, true).query;
    switch (pathname) {
        case 'camel_to_snake':
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            for (key in query) {
                response.write(camel_to_snake(query[key].replace(/['"]/g, "")));
            }
            response.end();
            break;
        case 'snake_to_camel':
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            for (key in query) {
                response.write(snake_to_camel(query[key].replace(/['"]/g, "")));
            }
            response.end();
            break;
    }

}).listen(8080, () => {
    console.log('start server');
    });

function camel_to_snake(str) {
    //str = replace(/[A-Z]/g, $ &.toLowerCase());
    str = str.replace(/^./g, (match) =>
    {
        return match.toLowerCase();
    });
    return str.replace(/[A-Z]/g, (match) => {
        return `_${match.toLowerCase()}`;
    });
}

function snake_to_camel(str) {
    str = str.replace(/^./g, (match) => {
        return match.toUpperCase();
    });
    return str.replace(/_./g, (match) => {
        return match.substr(1).toUpperCase();
    });
}