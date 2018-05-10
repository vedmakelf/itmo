function lesson5(task) {
    switch (task) {
        case 1:
            //Построить объект студент со свойствами: Имя, Фамилия, Возраст, Интересы(в виде массива), Место обучения.Написать отдельную функцию, которой передается объект студент, а она выводит его содержимое.
            var student = {
                'Имя': `Кадзуто`,
                'Фамилия': `Киригая`,
                'Возраст': `22`,
                'Интересы': [`VRMMO`, `программирование`, `ИИ`],
                'Место обучения': `Оксфорд`
            };

            function print(student) {
                var buffer;
                for (var st in student) {
                    if (student[st] instanceof Object) {
                        buffer = student[st].join(', ');
                    } else {
                        buffer = student[st];
                    }
                    console.log(`${st}: ${buffer}`);
                }
            }

            print(student);
            break;
        case 2:
            //Заданы два массива A и B необходимо их объединить в один массив C так, чтобы в массиве остались уникальные(неповторяющиеся) элементы.Например: A = [1, 2], B = [2, 3] получим С = [1, 2, 3].
            var a = [1, 2, 10];
            var b = [2, 3, 5];
            var arr = a.concat(b);

            function unique(arr) {
                var c = new Array();
                for (var element in arr) {
                    if (c.indexOf(arr[element]) === -1) {
                        c.push(arr[element]);
                    }
                }
                return c;
            }
            var c = unique(arr);
            console.log(c);
            break;
        case 3:
            //Написать отдельную функцию, которая выводит пользователю заданное число чисел Фибоначчи. (например, первых 8 чисел Фибоначчи: 1, 1, 2, 3, 5, 8, 13, 21).Заданное число передается функции в качестве аргумента.Про числа Фибоначчи: https://ru.wikipedia.org/wiki/Числа_Фибоначчи
            var number = 8;
            function fibonacciNumber(number) {
                var arr = new Array();
                for (var i = 0; i < number; i++) {
                    switch (i) {
                        case 0:
                            arr[i] = 0;
                            break;
                        case 1:
                            arr[i] = 1;
                            break;
                        default:
                            arr[i] = arr[i - 1] + arr[i - 2];
                            break;
                    }
                }
                console.log(arr.join(', '));
                return arr;
            }
            fibonacciNumber(number);
            break;
        case 4:
            //Напишите функцию counter, которая возвращает количество дней, часов и минут до нового года.Датой наступления нового года считается 1 января.Функция должна вернуть строку вида: "14 дней 21 час 46 минут" Нужно реализовать корректные окончания слов, например: 1 день, 2 дня, 5 дней.Функция должна корректно работать при запуске в любом году, т.е.грядущий год должен вычисляться программно.    
            function counter() {
                nowDay = new Date();
                var year = new Date(nowDay.getFullYear() + 1, 0, 1, 0, 0, 0);
                var msTime = Math.abs(year - Date.now());
                var untilTheNewYear = {
                    day: Math.floor(msTime / (60 * 60 * 24 * 1000)),
                    hours: Math.floor((msTime % (60 * 60 * 24 * 1000)) / (60 * 60 * 1000)),
                    minutes: Math.floor(((msTime % (60 * 60 * 24 * 1000)) % (60 * 60 * 1000)) / (60 * 1000)),
                    seconds: Math.floor((((msTime % (60 * 60 * 24 * 1000)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000)
                };

                function declOfNum(n, timeUnits) {
                    var titles = {
                        'day': ['день', 'дня', 'дней'],
                        'hours': ['час', 'часа', 'часов'],
                        'minutes': ['минута', 'минуты', 'минут'],
                        'seconds': ['секунда', 'секунды', 'секунд'],
                    };
                    return titles[timeUnits][(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
                }
                return `До нового года осталось: ${untilTheNewYear.day} ${declOfNum(untilTheNewYear.day, 'day')} ${untilTheNewYear.hours} ${declOfNum(untilTheNewYear.hours, 'hours')} ${untilTheNewYear.minutes} ${declOfNum(untilTheNewYear.minutes, 'minutes')} ${untilTheNewYear.seconds} ${declOfNum(untilTheNewYear.seconds, 'seconds')}`;
            }
            console.log(counter());
            break;
    }
}