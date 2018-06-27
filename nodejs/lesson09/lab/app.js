var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
var session = require('express-session');
var crypto = require('crypto');
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080, (error) =>{
    console.log(`star server; port: 8080`);
});

// var userRout = require('./routes/control.js');
// app.use('/control', userRout);

app.use(express.static('public'));

io.on('connection', (socket) => {
    var room = searchEmptyRoom();
    if (room === false) {
        socket.emit('news', {
            room: 'new room',
            nameRoom: arr.length,
            player: 'player1'
        });
    } else {
        arr[room].player2 = socket.id;
        socket.join(room);
        io.sockets.connected[arr[room].player2].emit('news', {
            room: 'found',
            nameRoom: room,
            player: 'player2'
        });
        io.sockets.connected[arr[room].player1].emit('news', {
            room: 'found',
            nameRoom: room,
            player: 'player1'
        });
        io.sockets.in(room).emit('step', {
            player: 'player1'
        });
    }
    socket.on('step', function (data) {
        if (data.winner) {
            delete arr[room];
        }
        io.sockets.in(data.room).emit('step', data);
    });
    socket.on('create', function (room) {
        socket.join(room);
        arr[room] = {
            player1: socket.id,
            player2: null
        };
        socket.emit('news', {
            room: 'waiting'
        });
    });
});

var arr = [];

function searchEmptyRoom() {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].player2 === null) {
            return i;
        }
    }
    return false;
}