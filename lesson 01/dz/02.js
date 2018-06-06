// JavaScript source code
/**
 * 
 * @param {function} func
 */
function decorator(func) {
    var arg = arguments;
    return function () {
        var arr = func();
        var result = {};
        if (arr instanceof Array) {
            for (var i = 0, j = 0; i < arr.length; i++) {
                if (arg[i + 1]) {
                    result[arg[i + 1]] = arr[i];
                    j++;
                } else {
                    result[i - j] = arr[i];
                }
            }
        } else {
            result = arr;
        }
        return result;
    }
}

function func1() {
    return [1, 2]
}

function func2() {
    return ['Python', 'is', 'programming language']
}

var returnObject1 = decorator(func1, 'one', 'two');
var returnObject2 = decorator(func2, 'a', 'b', 'c');

var object1 = returnObject1();
var object2 = returnObject2();

console.dir(object1);
console.dir(object2);