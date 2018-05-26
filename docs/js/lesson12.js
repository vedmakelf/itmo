// JavaScript source code
var table = document.createElement('table');
table.style.borderCollapse = 'collapse';

for (var i = 0; i < 10; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 10; j++) {
        var td = document.createElement('td');
        td.style.width = '50px';
        td.style.height = '50px';
        td.style.border = '1px solid black';
        td.id = `${i + 1}-${j + 1}`
        td.style.textAlign = 'center'
        td.style.color = 'white';
        td.style.cursor = 'pointer';
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

document.getElementById('game').innerHTML = '';
document.getElementById('game').appendChild(table);

var ship = [];
ship.push(...'1111;111;111;11;11;11;1;1;1;1'.split(';'));

for (var i = 0; i < ship.length; i++) {
    var x = 10;
    var y = 0;
    do {
        var length = ship[i].length;
        x = proverkaX(x, length);
        y = random();
    } while (!proverka(x, y, ship[i].length));

    for (var j = 0; j < ship[i].length; j++) {
        var id = `${y}-${x + j}`;
        document.getElementById(id).innerHTML = '1'
    }
}

function random() {
    return Math.floor(Math.random() * 10 + 1);
}

function proverkaX(x, length) {
    while (10 - x < length) {
        x = random();
    }
    return x;
}

function proverka(x, y, length) {
    var result = true;
    var ii = 0;
    if (10 - x > length) length + 1;
    if (x > 1) ii = -1;
    for (var i = ii; i < length; i++) {
        switch (true) {
            case y === 1:
                if (document.getElementById(`${y}-${x + i}`).innerHTML === '1' ||
                    document.getElementById(`${y + 1}-${x + i}`).innerHTML === '1') {
                    result = false;
                }
                break;
            case y === 10:
                if (document.getElementById(`${y}-${x + i}`).innerHTML === '1' ||
                    document.getElementById(`${y - 1}-${x + i}`).innerHTML === '1') {
                    result = false;
                }
                break;
            default:
                if (document.getElementById(`${y}-${x + i}`).innerHTML === '1' ||
                    document.getElementById(`${y + 1}-${x + i}`).innerHTML === '1' ||
                    document.getElementById(`${y - 1}-${x + i}`).innerHTML === '1') {
                    result = false;
                }
                break;
        }
    }

    return result;
}

document.getElementById(`game`).onclick = function (e) {
    if (e.target.localName === 'td') {

        if (e.target.innerHTML === "1") {
            e.target.style.backgroundColor = 'red';
            e.target.style.color = 'red';
        } else {
            e.target.style.color = 'black';
            e.target.innerHTML = "X"
        }
    }

    e.stopPropagation();
};