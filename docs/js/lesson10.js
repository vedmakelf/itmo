function lesson10(task) {
    switch (task) {
        case 1:
            function Product(name, price) {
                this._name = name;
                this._price = price;
                this.getPrice = function () {
                    return this._price;
                }
            }
            function Basket() {
                this._goods = [];
                this._totalQuantity = 0;
                this._totalSum = 0;
                /**
                 * 
                 * @param {string} product
                 * @param {number} quantity
                 */
                this.addProduct = function (product, quantity) {
                    let sum = quantity * product.getPrice();
                    this._goods.push({
                        product: product,
                        quantity: quantity,
                        sum: sum
                    });
                    this._totalQuantity += quantity;
                    this._totalSum += sum;
                }
                this.getTotalQuantity = function () {
                    return this._totalQuantity;
                }
                this.getTotalSum = function () {
                    return this._totalSum;
                }
            }
            var computer = new Product('Компьютер', 25000);
            var monitor = new Product('Монитор', 10000);
            var basket1 = new Basket();
            basket1.addProduct(computer, 10);
            basket1.addProduct(monitor, 20);
            console.log(`Всего товаров: ${basket1.getTotalQuantity()}шт`);
            console.log(`Итог: ${basket1.getTotalSum()}р`);
            break;
        case 2:
            /**
             * 
             * @param {string} name
             * @param {number} age
             * @param {string} sex
             * @param {Array} hobby
             */
            function Human(name, age, sex, hobby) {
                this._name = name;
                this._age = age;
                this._sex = sex;
                this._hobby = hobby;
                this.toString = function () {
                    var print = `Человек: ${this._name}. Возраст: ${this._age} ${this._declOfNum(this._age)}. Пол: ${this._sex}. Интересы: ${this._hobby.join(', ')}.`;
                    return print;
                }
                this._declOfNum = function (n) {
                    var titles = ['год', 'года', 'лет'];
                    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
                }
            }
            /**
             * 
             * @param {string} name
             * @param {number} age
             * @param {string} sex
             * @param {Array} hobby
             * @param {string} placeOfStudy
             */
            function Student(name, age, sex, hobby, placeOfStudy) {
                Human.call(this, name, age, sex, hobby);
                this._placeOfStudy = placeOfStudy;
                this.toString = function () {
                    var print = `Человек: ${this._name}. Возраст: ${this._age} ${this._declOfNum(this._age)}. Пол: ${this._sex}. Интересы: ${this._hobby.join(', ')}. Место обучения: ${this._placeOfStudy}.`;
                    return print;
                }
            }
            var human1 = new Human('Вася', 30, 'м', ['лыжи', 'рыбалка']);
            var student1 = new Student('Кадзуто', 17, 'м', ['VRMMO', 'программирование', 'ИИ'], 'Оксфорд');
            console.log(human1.toString());
            console.log(student1.toString());
            break;
        case 3:
            /**
             * 
             * @param {string} name
             */
            function User() {
                this._name = undefined;
                this.toString = function () {
                    return this._name;
                }
            }
            User.anonymous = function () {
                var user = new User();
                user._name = 'Аноним';
                return user;
            }
            /**
             * 
             * @param {string} name
             * @param {number} age
             */
            User.newUser = function (name, age) {
                var user = new User();
                user._name = name;
                user._age = age;
                return user;
            }

            var user1 = User.anonymous();
            var user2 = User.newUser('Кадзуто', 17);
            console.log(user1.toString());
            console.log(user2.toString());
            break
        case 4:
            /*
             * 1) File - позволяет получить информацию о файле
             * 2) Error - создает свой объект ошибки для дальнейшего отлова
             * 3) Image - объект изображения, хранить ссылку на изображение и размер
             * 4) FormData - предназначен для хранения кодированых данных, хранит набор пар "ключ-значение"
             * 5) Proxy - служит для перехвата обращений к другим объектам и их модификации
             * 6) Audio - объект позволяющий работать со звуком
             * 7) URL - объект для работы с url
             * 8) Symbol - примитивный тип данных, служить для создания уникальных индентификаторов
             * 9) WeakMap - коллекция для хранения объектов, которая хранит пары ключ-объект, где ключ хранит ссылку на объект
             * 10) RangeError - представялет ошибку ввода
             * */
            location.href = '#openModalLesson10';
            break;
        case 5:
            /*Правила мирка
             * у каждого курса токо один учитель
             * у каждого учителя только одна группа учеников и он может вести только одну группу
             * у курса можно узнать кто его учитель и и какие студенты на него ходят
             * у учителя можно узнать какой курс он препадает, как его зовут и кто его студенты
             * у студента можно узнать как его зовут, на какой курс он ходит и кто препадает курс
             */
            function Human(name, surname) {
                this._name = name;
                this._surname = surname;
                this.getFullname = function () {
                    return `${this._name} ${this._surname}`
                }
            }
            function Student(name, surname) {
                Human.call(this, name, surname);
                this._teacher;
                this._course;
                this._addTeacher = function (teacher) {
                    this._teacher = teacher;
                }
                this._addCourse = function (course) {
                    this._course = course;
                }
                this.getCourse = function () {
                    return this._course.getNameCourse();
                }
                this.getTeacher = function () {
                    return this._teacher.getFullname();
                }
            }
            function Teacher(name, surname, students = []) {
                Human.call(this, name, surname);
                this._students = students;
                for (var i = 0; i < this._students.length; i++) {
                    this._students[i]._addTeacher(this);
                }
                this._course;
                this._addCourse = function (course) {
                    this._course = course;
                    for (var i = 0; i < this._students.length; i++) {
                        this._students[i]._addCourse(course);
                    }
                }
                this.addStudents = function (students) {
                    for (var i = 0; i < students.length; i++) {
                        this._students.push(students[i]);
                        students[i]._addTeacher(this);
                        students[i]._addCourse(this._course);
                    }
                }
                this.getCourse = function () {
                    return this._course.getNameCourse();
                }
                this.getStudents = function () {
                    var student = []
                    for (var i = 0; i < this._students.length; i++) {
                        student.push(this._students[i].getFullname());
                    }
                    return student.join(', ');
                }
            }
            function Courses(nameCourse, teacher) {
                this._nameCourse = nameCourse;
                this._teacher = teacher;
                this._teacher._addCourse(this);
                this.getNameCourse = function myfunction() {
                    return this._nameCourse;
                }
                this.getStudents = function () {
                    return this._teacher.getStudents();
                }
                this.getTeacher = function () {
                    return this._teacher.getFullname();
                }
            }
            var student1 = new Student('Вася', 'Пупкин')
            var student2 = new Student('Петя', 'Петушков')
            var teacher = new Teacher('Михаил', 'Михайлович', [student1, student2]);
            var course = new Courses('Програмирование', teacher);
            console.log(`Студент 1 - ${student1.getFullname()}`)
            console.log(`Студент 1 учиться на курсе - ${student1.getCourse()}`)
            console.log(`У студент 1 препадает - ${student1.getTeacher()}`)
            console.log(`Учитель - ${teacher.getFullname()}`)
            console.log(`Учитель препадает - ${teacher.getCourse()}`)
            console.log(`Учитель препадает у - ${teacher.getStudents()}`)
            console.log(`Курс - ${course.getNameCourse()}`)
            console.log(`Курс препадает - ${course.getTeacher()}`)
            console.log(`Курс слушают следующие студенты: ${course.getStudents()}`)
            console.log(``)
            var student3 = new Student('Коля', 'Петушков')
            teacher.addStudents([student3]);
            console.log(`Учитель - ${teacher.getFullname()}`)
            console.log(`Учитель препадает - ${teacher.getCourse()}`)
            console.log(`Учитель препадает у - ${teacher.getStudents()}`)
            console.log(`Курс - ${course.getNameCourse()}`)
            console.log(`Курс препадает - ${course.getTeacher()}`)
            console.log(`Курс слушают следующие студенты: ${course.getStudents()}`)
            break;
    }
}