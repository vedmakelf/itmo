function connect() {
    var socket = io.connect('http://localhost:8080');
    var room;
    var player = null;
    document.getElementById('connect').disabled = true;
    socket.on('news', (data) => {
        switch (data.room) {
            case 'new room':
                room = data.nameRoom;
                socket.emit('create', room);
                break;
            case 'waiting':
                document.getElementById('info').textContent = 'Ожидание игрока...';
                player = data.player;
                break;
            case 'found':
                document.getElementById('info').textContent = 'Игрок найден';
                player = data.player;
                room = data.nameRoom;
                document.getElementById('player').textContent = `Вы: ${player}`;
                game(socket, room, player);
                break;
        }
    });
}
function game(socket, room, player) {
    var control = {
        player: player === 'player1' ? 'X' : 'O',
        step: null
    }
    socket.on('step', (data) => {
        if (data.winner) {
            document.getElementById('info').textContent = `Выйграл игрок ${data.winner}`;
            socket.emit('end');
            control.player = null;
            document.getElementById('connect').disabled = false;
            var cell = document.querySelectorAll('.cell');
            for (var i = 0; i < cell.length; i++) {
                cell[i].classList.remove('off');
                cell[i].textContent = '';
            }
            return;
        }
        control.step = data.player;
        document.getElementById('step').textContent = `Ход: ${control.step}`;
        if (data.id) {
            document.getElementById(data.id).textContent = data.control
        }
    });
    document.getElementById('x-o').onclick = function (e) {
        switch (true) {
            case player === control.step:
                if (e.target.classList.contains('off') && !e.target.classList.contains('cell')) {

                } else {
                    e.target.textContent = control.player;
                    e.target.classList.add('off');
                    if (gameOver(control.player)) {
                        socket.emit('step', {
                            winner: player,
                            room: room
                        });
                        return;
                    }
                    socket.emit('step', {
                        room: room,
                        player: player === 'player1' ? 'player2' : 'player1',
                        id: e.target.id,
                        control: control.player
                    });
                }
                break;
            default:
                break;
        }
    }

    function gameOver(str) {
        for (var i = 1; i < 4; i++) {
            if ((document.getElementById(`1-${i}`).textContent === str
                && document.getElementById(`2-${i}`).textContent === str
                && document.getElementById(`3-${i}`).textContent === str)
                || (document.getElementById(`${i}-1`).textContent === str
                    && document.getElementById(`${i}-2`).textContent === str
                    && document.getElementById(`${i}-3`).textContent === str)) {
                return true;
            }
        }
        if ((document.getElementById(`1-1`).textContent === str
            && document.getElementById(`2-2`).textContent === str
            && document.getElementById(`3-3`).textContent === str)
            || (document.getElementById(`3-1`).textContent === str
                && document.getElementById(`2-2`).textContent === str
                && document.getElementById(`1-3`).textContent === str)) {
            return true;
        }
        return false;
    }
}