//var x = 1, y=1;
//while (y <= 100) {
//    y++;
//    x = x + y;
//}
//console.log(`x=${x}`);

//var x = 1, y = 1;
//while (x <= 100) {
//    x++;
//    y += x;
//}
//console.log(`y=${y}`);


//var obj1 = {
//    name: `test`
//};

////function copy(obj) {
////    obj.name = `test2`
////    return obj;
////}

//var obj2 = obj1;
//obj2.name = `test2`;

//console.log(obj1.name);
//console.log(obj2.name);

//function test() {
//    var test = {
//        x: 0,
//        y: function () { console.log(test.x) }
//    };
//    var line1 = {
//        x: [],
//        y: [],
//        type: 'scatter'
//    };
//    for (var i = 0; i < 20; i++) {
//        line1.x.push(i);
//        line1.y.push(i);
//    }
//    var data = [line1];
//    Plotly.newPlot('placeholder', data);
//}


var tds = document.getElementsByTagName('td');

for (var i = 0; i < tds.length; i++) {
    tds[i].onclick = handler;
}

/**
 * test
 * @param {any} e
 */
function handler(e) {
    switch (this.innerText) {
        case 'c':
            document.getElementById('inputCalc').value = '';
            break;
        case '=':
            document.getElementById('inputCalc').value = eval(document.getElementById('inputCalc').value);
            break;
        default:
            document.getElementById('inputCalc').value += this.innerText;
            break;
    }
}

/**
 * события загрузки все верстки
 */
window.onload = function () {

}