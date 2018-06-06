// JavaScript source code
/**
 * 
 * @param {function} func
 * @param {number} time
 */
function decorator(func, time) {
    return function () {
        setTimeout(func, time, ...arguments);
    }
}

function print() {
    console.log('Функция выполниться с задержкой в 2 секунды');
}

var pause = decorator(print, 2000);
pause();