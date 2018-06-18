var calc = {
    convert: function (str) {
        var stack = [];
        stack.str = '';
        var regNumber = /[0123456789]/;
        for (var i = 0; i < str.length; i++) {
            var symbol = str[i];
            if (symbol === ' ') {
                continue;
            }
            if (symbol === '/' && i + 1 < str.length) {
                if (str[i + 1] === '/') {
                    symbol += str[i + 1]
                    i++;
                }
            }
            switch (true) {
                case regNumber.test(symbol):
                    while (true) {
                        if (i + 1 < str.length && regNumber.test(str[i + 1])) {
                            symbol += str[i + 1]
                            i++;
                        } else {
                            break;
                        }
                    }
                    stack.str += symbol + ' ';
                    break;
                case symbol === ')':
                    while (true) {
                        var buffer = stack.pop();
                        if (buffer == '(' || stack.length === 0) {
                            break;
                        } else {
                            stack.str += buffer + ' ';
                        }
                    }
                    break;
                case symbol === '(':
                    stack.push(symbol);
                    break;
                default:
                    while (true) {
                        if (stack.length === 0 || lvl(symbol) < lvl(stack[stack.length - 1])) {
                            stack.push(symbol);
                            break;
                        } else {
                            var buffer = stack.pop();
                            stack.str += buffer + ' ';
                        }
                    }
                    break;
            }
        }
        function lvl(str) {
            switch (str) {
                case '^':
                    return 0;
                case '*': case '/': case '//': case '%':
                    return 1;
                case '+': case '-':
                    return 2;
                case '(': case ')':
                    return 3;
                default:
                    return -2;
            }
        }
        while (stack.length !== 0) {
            var buffer = stack.pop();
            stack.str += buffer + ' ';
        }
        return stack.str.trim();
    },
    calc: function (str) {
        var buffer = str.split(' ');
        var stack = [];
        var regNumber = /[0123456789]+/;
        for (var i = 0; i < buffer.length; i++) {
            var elem = buffer[i];
            switch (true) {
                case regNumber.test(buffer[i]):
                    stack.push(buffer[i]);
                    break;
                case elem === '+':
                    var x = parseFloat(stack.pop());
                    var y = parseFloat(stack.pop());
                    stack.push(y + x);
                    break;
                case elem === '-':
                    var x = parseFloat(stack.pop());
                    var y = parseFloat(stack.pop());
                    if (isNaN(y) || y === undefined) {
                        stack.push(-x);
                    } else {
                        stack.push(y - x);
                    }
                    break;
                case elem === '*':
                    var x = parseFloat(stack.pop());
                    var y = parseFloat(stack.pop());
                    stack.push(y * x);
                    break;
                case elem === '/':
                    var x = parseFloat(stack.pop());
                    var y = parseFloat(stack.pop());
                    stack.push(y / x);
                    break;
                case elem === '%':
                    var x = parseFloat(stack.pop());
                    var y = parseFloat(stack.pop());
                    stack.push(y % x);
                    break;
                case elem === '^':
                    var x = parseFloat(stack.pop());
                    var y = parseFloat(stack.pop());
                    stack.push(y ** x);
                    break;
                case elem === '//':
                    var x = parseFloat(stack.pop());
                    var y = parseFloat(stack.pop());
                    stack.push(Math.floor(y / x));
                    break;
                default:
                    break;
            }
        }
        return stack.pop();
    }
}
module.exports = calc;