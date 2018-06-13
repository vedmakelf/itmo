var http = require("http");
var fs = require('fs');
var url = require("url");
var path = require('path');

var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

http.createServer((request, response) => {
    var postData = "";
    var pathname = url.parse(request.url).path;
    if (pathname == '/')
        pathname = '/index.html';
    var extname = path.extname(pathname);
    var mimeType = mimeTypes[extname];
    pathname = pathname.substring(1, pathname.length);

    switch (extname) {
        case ".gif": case ".jpg": case ".ico":
            var img = fs.readFileSync('./' + pathname);
            response.writeHead(200, { 'Content-Type': mimeType });
            response.end(img, 'binary');
            break;
        case ".json":
            fs.readFile(pathname, 'utf8',  function  (err,  data) {
                if (err) {
                    console.log('Could not find or open file ' +
                        pathname + ' for reading\n');
                } else {
                    response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    response.end(data);
                }
            });
            break;
        default:
            fs.readFile(pathname, 'utf8',  function  (err,  data) {
                if (err) {
                    console.log('Could not find or open file ' +
                        pathname + ' for reading\n');
                } else {
                    response.writeHead(200, { 'Content-Type': mimeType });
                    response.end(data);
                }
            });
            break;
    }

}).listen(8080, () => {
    console.log('start server');
    });

var bd = {
    0: "Сделал две ошибки — получил нужный результат. Исправил одну — результат неверный.",
    1: "От меня боятся принимать .exe файлы.",
    2: "Рабочий код бесценен. Для всего остального есть MasterCard.",
    3: "Сын спросил: почему солнце восходит и заходит? Главное, что работает.",
    4: "Компилятор, не матерись! Объясни НОРМАЛЬНО.",
    5: "Программирование — процесс творческий. А вдохновение приходит поздно вечером.",
    6: "Начал решать проблему с помощью регулярных выражений. Теперь решаю две проблемы.",
    7: "Люди, как пиратская версия винды. Вроде ось одна, а баги у всех разные.",
    8: "Real programmers don't document if it was hard to write, it should be hard to read.",
    9: "Исправил в коде одну ошибку. Создал две новых.",
    10: "Бывают моменты, когда единственное, что ты хочешь - это делить на ноль.",
    11: "Меня трудно найти, легко потерять и невозможно забыть. Да я же рабочий исходник!",
    12: "Посеял ключи от квартиры. В голове крутятся мысли о Ctrl+F."
};