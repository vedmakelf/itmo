function lesson6(task) {
    switch (task) {
        case 1:
            //Построить объект студент:
            //- свойства: Имя, Фамилия, Возраст, Интересы(в виде массива), Место обучения.
	        //- метод выводящий в консоль биографическую справку в виде, например: «Иван Петров. 21 год.Интересы: программирование, музыка, аниме.Учится в ИТМО.
            var student = {
                name: `Кадзуто`,
                surname: `Киригая`,
                age: `22`,
                hobby: [`VRMMO`, `программирование`, `ИИ`],
                placeOfStudy: `Оксфорд`,
                printInformation: function () {
                    var print = `${this.name} ${this.surname}. ${this.age} ${declOfNum(this.age)}. Интересы: ${this.hobby.join(', ')}. Место обучения: ${this.placeOfStudy}.`;
                    console.log(print);
                    function declOfNum(n) {
                        var titles = ['год', 'года', 'лет'];
                        return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
                    }
                }
            };
            student.printInformation();
            break;
        case 2:
            //Написать функцию вычисляющую факториал числа с использованием рекурсии.Факториал числа - это число, умноженное на себя минус один, затем на себя
            //минус два и так далее, до единицы.Обозначаетс n! Определение факториала можно записать как:
            //- n! = n * (n - 1) * (n - 2) * ...* 1
            //- 2! = 2 * 1
            //- 3! = 3 * 2 * 1

            var n = 5;
            function factorial(n) {
                if (n === 1 || n === 0) {
                    return 1;
                } else {
                    return n * factorial(n - 1);
                }
            };
            console.log(factorial(n));
            break;
        case 3:
            //Сделайте функцию, каждый вызов который будет генерировать случайное число от 1 до 100, но так, чтобы оно не повторялось, пока не будут перебраны все числа из этого промежутка.Решите задачу через замыкания - в замыкании должен хранится массив чисел, которые уже были сгенерированы функцией. 

            function random() {
                var arr = new Array();
                return function () {
                    if (arr.length === 100) {
                        arr = [];
                    }
                    var num = Math.floor(Math.random() * 100 + 1);
                    while (arr.indexOf(num) != -1) {
                        num = Math.floor(Math.random() * 100 + 1);
                    }
                    arr.push(num);
                    return num;
                }
            }
            var rand = random();
            console.log(rand());
            break;
    }
}