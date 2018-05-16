// JavaScript source code
var size = parseInt(prompt(`введите размер игрового поля`));

var table = document.createElement('table');

var rand = new random();

for (var i = 0; i < size; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < size; j++) {
        var td = document.createElement('td');
        td.innerText = rand();
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

function random() {
    var arr = [];
    return function () {
        var num;
        do {
            Math.floor(Math.random() * (size * size) + 1);
        } while (arr.includes(num));
        return num;
    }
}

document.getElementById('game').appendChild(table);