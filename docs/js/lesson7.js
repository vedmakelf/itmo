function lesson7(task) {
    switch (task) {
        case 1:
            //Подключить стороннюю библиотеку для построения графиков.Построить график функции y = f(x):
            //- y = 5 / x, при x >= 1;
            //- y = x * x – 4 * x, при x < 1.
            //Шаг варьирования x равен 0.01 и интервал варьирования - 5 < x < 5. Расчёт функции y = f(x) реализовать в виде отдельной функции.
            google.charts.load('current', { packages: ['corechart', 'line'] });
            google.charts.setOnLoadCallback(drawBasic);
            document.getElementById('openModalLesson4-div').style.width = '600px'
            location.href = '#openModalLesson4';

            function drawBasic() {

                var data = new google.visualization.DataTable();
                data.addColumn('number', 'X');
                data.addColumn('number', 'f(x)');

                var fx = {
                    min: -5,
                    max: 5,
                    step: 0.01,
                    graph: function () {
                        var arr = new Array();
                        for (var i = this.min; i <= this.max; i = parseFloat((i + this.step).toFixed(2))) {
                            let y;
                            let x = i;
                            switch (true) {
                                case x >= 1:
                                    y = 5 / x;
                                    break;
                                case x < 1:
                                    y = x * x - 4 * x;
                                    break;
                            }
                            arr.push([x, y])
                        }
                        return arr;
                    }
                };

                data.addRows(fx.graph());

                var options = {
                    hAxis: {
                        title: 'X'
                    },
                    vAxis: {
                        title: 'Y'
                    }
                };

                var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

                chart.draw(data, options);
            }
            break;
        case 2:
            //Подключить стороннюю библиотеку для юнит тестирования.Написать несколько тестов для функции, рассчитывающей y = 1 / x + sqrt(x).
            function Fx(x) {
                return (1 / x + Math.sqrt(x));
            }
            describe("Позитивное тестирование", function () {
                it(`Тест x = 4`, function () {
                    let rez = Fx(4);
                    expect(rez).toBe(2.25);
                });
                it(`Тест x = 10`, function () {
                    let rez = Fx(10);
                    expect(rez).toBe(3.2622776601683796);
                });
                it(`Тест x = 100`, function () {
                    let rez = Fx(100);
                    expect(rez).toBe(10.01);
                });
            });
            describe("Негативное тестирование", function () {
                it(`Тест x = 0`, function () {
                    let rez = Fx(0);
                    expect(rez).toBe(Infinity);
                });
                it(`Тест x = -1`, function () {
                    let rez = Fx(-1);
                    expect(rez).toBeNaN();
                });
            });
            break;
        case 3:
            //Написать свою подключаемую js библиотеку для работы с массивом, хранящим целые числа.Библиотека должна обладать следующими методами:
            //- поиск минимального элемента в переданном массиве;
            //- поиск максимально элемента в переданном массиве;
            //- расчет среднего арифметического значения элементов переданного массива;
            //- создание копии(клонирование) переданного массива.
            var arr = [1, 15, 5, 2, 40]
            ; (function () {
                window.arrFunction = {
                    max: function (arr) {
                        return Math.max.apply(Math, arr);
                    },
                    min: function (arr) {
                        return Math.min.apply(Math, arr);
                    },
                    average: function (arr) {
                        var sum = 0;
                        for (var i = 0; i < arr.length; i++) {
                            sum += arr[i];
                        }
                        return sum / arr.length;
                    },
                    copy: function (arr) {
                        return arr.slice();
                    }
                }
            }());
            console.log(`исходный массив: ${arr}`);
            console.log(`min: ${arrFunction.max(arr)}`);
            console.log(`max: ${arrFunction.min(arr)}`);
            console.log(`среднее арифметическоое элементов массива: ${arrFunction.average(arr)}`);
            var arr1 = arrFunction.copy(arr);
            arr1.push(111);
            console.log(`исходный массив: ${arr}; копия массива с новым элементом: ${arr1}`);
            break;
        case 4:
            //Написать кодер для шифра Цезаря(https://ru.wikipedia.org/wiki/Шифр_Цезаря). На вход принимается строка и сдвиг (число). На выход - зашифрованное/расшифрованное сообщение. Пример работы шифра Цезаря можно увидеть здесь: https://planetcalc.com/1434/. Примеры данных для тестирования:
            //    - Пример 1:
            //    - Зашифрованное сообщение: "Gur pyrnare naq avpre gur cebtenz, gur snfgre vg'f tbvat gb eha. Naq vs vg qbrfa'g, vg'yy or rnfl gb znxr vg snfg."
            //    - Сдвиг: -13.
            //    - Расшифрованное сообщение: "The cleaner and nicer the program, the faster it's going to run. And if it doesn't, it'll be easy to make it fast."
            //    - Пример 2:
            //    - Исходное сообщение: "There is no programming language, no matter how structured, that will prevent programmers from making bad programs."
            //    - Сдвиг: 25.
            //    - Зашифрованное сообщение: "Sgdqd hr mn oqnfqzllhmf kzmftzfd, mn lzssdq gnv rsqtbstqdc, sgzs vhkk oqdudms oqnfqzlldqr eqnl lzjhmf azc oqnfqzlr."

            ; (function () {
                var alphabetLowerCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var alphabetUpperCase = 'abcdefghijklmnopqrstuvwxyz';
                var regLowerCase = /[A-Z]/;
                var regUpperCase = /[a-z]/;
                window.caesarCipher = {
                    encodeDecode: function (str, shift) {
                        var arr = str.split('');
                        for (var i = 0; i < arr.length; i++) {
                            switch (true) {
                                case regLowerCase.test(arr[i]):
                                    arr[i] = replacement(alphabetLowerCase, arr[i]);
                                    break;
                                case regUpperCase.test(arr[i]):
                                    arr[i] = replacement(alphabetUpperCase, arr[i]);
                                    break;
                            }
                        }
                        function replacement(alphabet, symbol) {
                            var indexArr, index;
                            indexArr = alphabet.indexOf(symbol);
                            index = indexArr + shift;
                            switch (true) {
                                case index > alphabet.length - 1:
                                    while (index > alphabet.length - 1) {
                                        index = index - alphabet.length;
                                    }
                                    break;
                                case index < 0:
                                    while (index < 0) {
                                        index = index + alphabet.length;
                                    }
                                    break;
                            }
                            return alphabet[index];
                        };
                        return arr.join('');
                    }
                }
            }());
            var str1 = `Gur pyrnare naq avpre gur cebtenz, gur snfgre vg'f tbvat gb eha. Naq vs vg qbrfa'g, vg'yy or rnfl gb znxr vg snfg.`;
            console.log(`Зашифрованное сообщение: ${str1}`);
            console.log(`Расшифрованное сообщение: ${caesarCipher.encodeDecode(str1, -13)}`);
            var str2 = `There is no programming language, no matter how structured, that will prevent programmers from making bad programs.`;
            console.log(`Исходное сообщение: ${str2}`);
            console.log(`Зашифрованное сообщение: ${caesarCipher.encodeDecode(str2, 25)}`);
            break;
    }
}