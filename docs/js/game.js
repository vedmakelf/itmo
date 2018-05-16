// JavaScript source code

//�������� ������ � �������(���� �� ��������������).��������� �������� ���� ��������� �������.���� - ���� ������� � �������, �������������� � ��������� ������� � ������� �������.����� ���� �� ������� �� 1 �� N * N.��� ����� ������� ������� � �����.

//var size = parseInt(prompt(`������� ������ �������� ����`));
var size = 10;
var table = document.createElement('table');
table.style.borderCollapse = 'collapse';
var rand = new random();

for (var i = 0; i < size; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < size; j++) {
        var td = document.createElement('td');
        td.innerText = rand.num();
        td.style.color = rand.color()
        td.style.fontSize = rand.size();
        td.style.border = '1px solid black';
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