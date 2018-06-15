var x = 0;
for (var i = 2; i < process.argv.length; i++) {
    x += parseInt(process.argv[i]);
}

console.log(x);