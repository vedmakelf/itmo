var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
var session = require("express-session");
var crypto = require("crypto");
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(8080, error => {
  console.log(`star server; port: 8080`);
}); 

io.on('connection', (socket) => {
    socket.emit('user', {
        user: user
    });
    user.push({
        id: socket.id,
        name: 'Неопознаная рожа'
    })
    socket.emit('hist', {
        message: message
    });
    socket.on('news', function (data) {
        io.sockets.emit("news", data);
        var x = searechID(socket.id);
        if (x != false) {
            user[x].name = data.name;
        }
        message.push(data);
        if (message.length > 10) {
            message.shift();
        }
    });
});

var message = [];

var user = [];

app.use(express.static("public"));

function searechID(id) {
    for (let index = 0; index < user.length; index++) {
        if (user[index].id === id) {
            return index;
        }
    }
    return false;
}
