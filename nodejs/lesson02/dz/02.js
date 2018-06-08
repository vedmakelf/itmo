function* passwordGenerator(length) {
    var dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    while (true) {
        var password = "";
        for (var i = 0; i < length; i++) {
            password += dictionary[reand(dictionary.length - 1)]
        }
        yield password;
    }
    function reand(max) {
        return Math.floor(Math.random() * (max + 1));
    }
}

var passwordGen = passwordGenerator(5);

console.log(passwordGen.next().value);
console.log(passwordGen.next().value);
console.log(passwordGen.next().value);
console.log(passwordGen.next().value);
console.log(passwordGen.next().value);
