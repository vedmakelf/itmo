var fs = require('fs');

var fileData = 'data.txt';
var fileOut1 = 'out1.txt';
var fileOut2 = 'out2.txt';

/**
 * создание и наполнение файла data.txt
 * @param {string} fileData путь к файлу
 * @param {number} length количество чисел
 * @param {number} min минимальное число
 * @param {number} max максимальное число
 */
function creatFileData(fileData, length, min, max) {

    var str = "";

    for (var i = 0; i < length; i++) {
        if (i < length - 1) {
            str += `${reand(min, max)} `;
        } else {
            str += `${reand(min, max)}`;
        }
    }

    function reand(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    fs.writeFileSync(fileData, str, (err) => {
        if (err) throw err;
    });
}

creatFileData(fileData, 10, 0, 10);

var str = fs.readFileSync(fileData, 'utf8');

var out1 = "";
var out2 = "";

var str = str.split(' ');

for (var i = 0; i < str.length; i++) {
    if (str[i] % 2 === 0) {
        out1 += `${str[i]} `;
    }
    out2 += `${str[i] ** 3} `;
}

fs.writeFile(fileOut1, out1, (err) => {
    if (err) throw err;
});

fs.writeFile(fileOut2, out2, (err) => {
    if (err) throw err;
});