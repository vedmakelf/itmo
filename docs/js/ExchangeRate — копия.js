// JavaScript source code

location.href = '#close';
var gameArena = document.getElementById('gameArena')
while (gameArena.firstChild) {
    gameArena.removeChild(gameArena.firstChild);
}

var widthArena = 20;
var heightArena = 30;

var startSpeed = 1000;
var rateSpeed = 1.0

var figure;

var now = [0, 3];
var startPosition = [0, Math.floor(widthArena / 2) - 1];
var position = startPosition;
var prevPosition = startPosition;

function createArena() {
    for (var i = 0; i < heightArena; i++) {
        var divColumn = document.createElement('div');
        divColumn.setAttribute('y', i);
        divColumn.className = "line";
        for (var j = 0; j < widthArena; j++) {
            var divRow = document.createElement('div');
            divRow.className = "brick";
            divRow.setAttribute('x', j);
            divColumn.appendChild(divRow);
        }
        gameArena.appendChild(divColumn);
    }
}

function Figures() {
    var figures = {
        0: { //T
            0: '010|111',
            1: '01|11|01',
            2: '10|11|10',
            3: '111|010',
            length: 4
        },
        1: { //Q
            0: '11|11',
            length: 1
        },
        2: { //I
            0: '1111',
            1: '1|1|1|1',
            length: 2
        },
        3: { //Z
            0: '110|011',
            1: '01|11|10',
            length: 2
        },
        4: { //S
            0: '011|110',
            1: '10|11|01',
            length: 2
        },
        5: { //J
            0: '01|01|11',
            1: '111|001',
            2: '100|111',
            3: '11|10|10',
            length: 4
        },
        6: { //L
            0: '10|10|11',
            1: '001|111',
            2: '111|100',
            3: '11|01|01',
            length: 4
        }
    };
    function figureSelection() {
        return Math.floor(Math.random() * 7);
    }
    var rotation = 0;
    figures = figures[figureSelection()];
    this.figure = function () {
        return figures[rotation];
    }
    this.rotationOfAFigure = function () {
        if (rotation + 1 === figures.length) {
            rotation = 0;
        }
        else {
            rotation += 1;
        }
    }
}

function returnDiv(y, x) {
    return document.querySelector(`[y="${y}"] [x="${x}"]`);
};

function draw(figure) {
    var arr = [];
    figure = figure.split('|');
    for (var i = 0; i < figure.length; i++) {
        for (var j = 0; j < figure[i].length; j++) {
            if (figure[i][j] === '1') {
               if (j + position[1] > widthArena -1
                   || j + position[1] < 0) {
                   position = prevPosition;
                    return 1;
               } else if (i + position[0] > heightArena - 1
                   || returnDiv(i + position[0], j + position[1]).classList.contains('on')) {
                   return 0;
               }
               arr.push([i + position[0], j + position[1]]);
            }
        }
    }
    removeDraw();
    for (var i = 0; i < arr.length; i++) {

        returnDiv(arr[i][0], arr[i][1]).classList.add('now');
    }
    prevPosition = position;
    position = [position[0] + 1, position[1]];
    return 2
}

function removeDraw() {
    var classNow = document.querySelectorAll('.now');
    for (var i = 0; i < classNow.length; i++) {
        classNow[i].classList.remove('now');
    }
}

function shift(i) {
    position = [position[0], position[1] + i];
    draw(figure.figure());
}

window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 37: //left
            shift(-1);
            break;
        case 38: //up
            figure.rotationOfAFigure();
            position = [position[0], position[1]];
            draw(figure.figure());
            break;
        case 39: //right
            shift(1);
            break;
        case 40: //down
            break;
        default:
    }
    return false;
});

function chekGameOver(figure) {
    figure = figure.split('|');
    for (var i = 0; i < figure.length; i++) {
        for (var j = 0; j < figure[i].length; j++) {
            if (returnDiv(i + startPosition[0], j + startPosition[1]).classList.contains('on')) {
                return true;
            }
        }
    }
    return false;
}

function chekLine() {
    for (var i = 0; i < heightArena; i++) {
        var brick = document.querySelectorAll(`[y="${i}"] .brick.on`);
        if (brick.length === widthArena) {
            for (var k = 0; k < brick.length; k++) {
                brick[k].classList.remove('on');
            }
            var line = document.querySelector(`[y="${i}"]`);
            gameArena.insertBefore(line, document.querySelector(`[y="0"]`))
            line.setAttribute('y', 'remove');
            for (var j = i - 1; j >= 0; j--) {
                document.querySelector(`[y="${j}"]`).setAttribute('y', j + 1);
            }
            line.setAttribute('y', 0);
            document.getElementById('score').textContent = parseInt(document.getElementById('score').textContent) + 10 * rateSpeed;
        }
    }
}

var idInterval;
function start() {
    position = startPosition;
    figure = new Figures();
    if (chekGameOver(figure.figure())) {
        location.href = '#modalDialog';
        return;
    }
    idInterval = setInterval(function () {
        var code = draw(figure.figure())
        switch (code) {
            case 0:
                clearInterval(idInterval);
                var classNow = document.querySelectorAll('.now');
                for (var i = 0; i < classNow.length; i++) {
                    classNow[i].classList.remove('now');
                    classNow[i].classList.add('on');
                }
                chekLine();
                start();
                break;
            default:
                break;
        }
    }, startSpeed / rateSpeed);
}

rateSpeed = 5;
createArena();
start();