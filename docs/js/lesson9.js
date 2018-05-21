function lesson9(task) {
    switch (task) {
        case 1:
            //Даны несколько div элементов на html.По первому нажатию на каждый div он перекрашивается зеленым цветом, при повторном нажатии перекрашивается обратно и так далее каждый клик происходит чередование цвета.
            location.href = '#openModalLesson9';
            var openModalLesson9Task1 = document.getElementById('openModalLesson9Task1');
            openModalLesson9Task1.style.display = 'flex';
            openModalLesson9Task1.onclick = function (e) {
                if (e.target.className === "green-red") {
                    if (getComputedStyle(e.target).backgroundColor === 'rgb(255, 0, 0)') {
                        e.target.style.backgroundColor = 'green';
                    } else {
                        e.target.style.backgroundColor = 'red';
                    };
                    e.stopPropagation();
                };
            };
            break;
        case 2:
            //Реализовать счётчик нажатий на кнопку: Дана кнопка внутри неё записана цифра.При клике на кнопку – её значение должно увеличиваться на единицу.
            location.href = '#openModalLesson9';
            var openModalLesson9Task2 = document.getElementById('openModalLesson9Task2');
            openModalLesson9Task2.style.display = 'flex';
            var count = function () {
                var counter = 0;
                return function () {
                    return ++counter;
                };
            }();
            var buttonLesson9Task2 = document.getElementById('buttonLesson9Task2');
            buttonLesson9Task2.innerText = 0;
            buttonLesson9Task2.onclick = function (e) {
                this.innerText = count();
                e.stopPropagation();
            };
            break;
        case 3:
            //Изобразить клавиатуру и расположенные на ней клавиши в виде html документа.При нажатии клавиши пользователем на клавиатуре, подсвечивать нажатую клавишу на клавиатуре изображенной в html и выводить нажатое значение.

            location.href = '#openModalLesson9';
            var openModalLesson9Task3 = document.getElementById('openModalLesson9Task3');
            openModalLesson9Task3.style.display = 'block';
            window.idTime = [];
            document.onkeydown = function (event) {
                event.preventDefault();
                console.log(event.key);
                var reg = /[0-9a-z-=\[\]\\;`',.\/]/;
                switch (true) {
                    case reg.test(event.key) && event.key.length === 1:
                        keyboardDown(event, event.key)
                        break;
                    case event.key === " ":
                        keyboardDown(event, "space")
                        break;

                };
                function keyboardDown(event, str) {
                    write.value += event.key;
                    var li = SearchingText(str);
                    li.style.backgroundColor = '#3bd6ec73';
                    clearTimeout(idTime[event.keyCode]);
                    idTime[event.keyCode] = setTimeout(function () {
                        li.style.backgroundColor = '';
                    }, 1000); 

                    function SearchingText(key) {
                        childNodes = document.getElementById('keyboard').childNodes;
                        for (var i = 0; i < childNodes.length; i++) {
                            if (childNodes[i].innerText === key) {
                                return childNodes[i];
                            } else {
                                continue;
                            }
                        };
                    };
                };
                event.stopPropagation();
            }
            break
        case 4:
            ; (function () {
                function inDec(str, sys) {
                    var dec = 0;
                    for (var i = str.length - 1, j = 0; i >= 0; i--, j++) {
                        dec += hex(str[j]) * Math.pow(sys, i);
                    }
                    function hex(str) {
                        switch (str) {
                            case 'A': case 'a':
                                return 10;
                            case 'B': case 'b':
                                return 11;
                            case 'C': case 'c':
                                return 12;
                            case 'D': case 'd':
                                return 13;
                            case 'E': case 'e':
                                return 14;
                            case 'F': case 'f':
                                return 15;
                            default:
                                return parseInt(str);
                        };
                    }
                    return dec;
                };
                function outDec(num, sys) {
                    var arr = new Array();
                    var buffer = num;
                    var prevBuffer;
                    do {
                        prevBuffer = buffer;
                        arr.push(hex(buffer % sys));
                        buffer = Math.floor(buffer / sys);
                    } while (Math.floor(prevBuffer / sys) !== 0 || Math.floor(prevBuffer / sys) === 1);
                    function hex(num) {
                        switch (num) {
                            case 10:
                                return 'a';
                            case 11:
                                return 'b';
                            case 12:
                                return 'c';
                            case 13:
                                return 'd';
                            case 14:
                                return 'e';
                            case 15:
                                return 'f';
                            default:
                                return num;
                        };
                    };
                    return arr.reverse().join('');
                };
                window.numberSystem = {
                    dec2bin: function (dec) {
                        return outDec(dec, 2);
                    },
                    dec2oct: function (dec) {
                        return outDec(dec, 8);
                    },
                    dec2hex: function (dec) {
                        return outDec(dec, 16);
                    },
                    bin2dec: function (bin) {
                        return inDec(bin, 2);
                    },
                    oct2dec: function (oct) {
                        return inDec(oct, 8);
                    },
                    hex2dec: function (hex) {
                        return inDec(hex, 16);
                    }
                };
            }());

            console.log(numberSystem.bin2dec('1010011010'));
            console.log(numberSystem.oct2dec('755'));
            console.log(numberSystem.hex2dec('abcdef'));

            console.log(numberSystem.dec2bin(250));
            console.log(numberSystem.dec2oct(250));
            console.log(numberSystem.dec2hex(250));
            break;
    }
}