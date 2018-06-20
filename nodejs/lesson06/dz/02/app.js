let https = require('https');
let cheerio = require('cheerio')
let fs = require('fs');

function get(url, callback) {
    https.get(url, function (res) {
        console.log(res.method, res.statusCode);
        let data = '';

        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function () {
            callback(data)
        });
    })
}

var data = get('https://tproger.ru/', (data) => {
    var $ = cheerio.load(data);
    var arr = $('#main_columns > .news-main a').map(function (indx, el) {
        return $(el).attr('href');
    }).toArray();
    var now = new Date();
    var pathFolder = `${now.getFullYear()}.${now.getMonth()}.${now.getDay()}_${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`;
    fs.mkdir(pathFolder);
    for (var i = 0; i < arr.length; i++) {
        get(arr[i], (data) => {
            var $ = cheerio.load(data);
            var str = $('#content .entry-title').text();
            var path = `${pathFolder}\\${str}.txt`;
            var content = '';
            var str = $('#content p').map(function (indx, el) {
                if ($(el).hasClass('origin')
                    || $(el).hasClass('signature')) {
                    return false;
                } else {
                    $(el).remove('img');
                    $(el).remove('a');
                    return $(el).text();
                }
            }).toArray();
            for (var i = 0; i < str.length; i++) {
                if (str[i]) {
                    if (str[i][0] === '<') {
                        continue
                    }
                    content += str[i] + '\n';
                } else {
                    break;
                }
            }
            fs.writeFile(path, content, { encoding: 'utf8' }, function (err) {
                if (err) return console.log(err);
                console.log("Save file: " + path + '\n');
            })
        });
    }
});