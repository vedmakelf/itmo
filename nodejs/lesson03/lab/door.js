var http = require("http");
var url = require("url");

http.createServer((request, response) => {
    var data = url.parse(request.url, true).query;
    process.send(data);
    process.kill(process.pid);
}).listen(8080, () => {
    console.log('start server');
});