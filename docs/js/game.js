// JavaScript source code

//Доделать задачу с занятия(игра на внимательность).Генерация игрового поля заданного размера.Суть - дана таблица с числами, распаложенными в случайном порядке в ячейках таблицы.Числа идут по порядку от 1 до N * N.Все числа разного размера и цвета.

//var size = parseInt(prompt(`Введите размер игрового поля`));
var size = 3;
var table = document.createElement('table');
table.style.borderCollapse = 'collapse';
var rand = random();

for (var i = 0; i < size; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < size; j++) {
        var td = document.createElement('td');
        td.innerText = rand.num();
        td.style.color = rand.color()
        td.style.fontSize = rand.size();
        td.style.border = '1px solid black';
        td.style.textAlign = 'center';
        td.style.verticalAlign = 'center';
        td.style.width = '30px';
        td.style.height = '30px';
        td.style.cursor = 'default';
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
function random() {
    var arr = [];
    for (var i = 1; i <= size * size; i++) {
        arr.push(i);
    }
    arr.sort(function (a, b) {
        return Math.floor(Math.random() * 2);
    })
    return {
        num: function () {
            return arr.pop();
        },
        color: function () {
            var r = Math.floor(Math.random() * (256));
            var g = Math.floor(Math.random() * (256));
            var b = Math.floor(Math.random() * (256));
            return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
        },
        size: function () {
            let min = 10;
            let max = 25;
            return `${Math.floor(Math.random() * (max - min + 1) + min)}px`;
        }
    }
}
document.getElementById('game').innerHTML = '';
document.getElementById('game').appendChild(table);

table.onclick = gameStart;

var currenNumber = 1;

function gameStart(e) {
    if (e.target.tagName === 'TD') {
        if (e.target.innerText === currenNumber.toString()) {
            e.target.style.backgroundColor = 'red';
            if (currenNumber === (size * size)) {
                setTimeout('alert("lol");', 0);
            }
            currenNumber++;
        }
    }
}