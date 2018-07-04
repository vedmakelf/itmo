var socket;

function connect() {
    var socket = io.connect('http://192.168.11.48:8080');
    this.socket = socket;
    socket.on('hist', (data) => {
        for (let index = 0; index < data.message.length; index++) {
        document.getElementById('textarea').value += `${data.message[index].name}: ${data.message[index].message}\n`;
        }
    });
    socket.on('news', (data) => {
        document.getElementById('textarea').value += `${data.name}: ${data.message}\n`;
    });
    socket.on('user', (data) => {
        document.getElementById('online').value = '';
        for (let index = 0; index < data.user.length; index++) {
            document.getElementById('online').value += `${data.user[index].name}\n`;
            }
    });
}

function news(params) {
    var name = document.getElementById('name').value;
    if (name === '') {
        name = 'Неопознаная рожа';
    }
    socket.emit('news', {
        message: params,
        name: name
    })
    document.getElementById('mess').value = '';
}

connect();