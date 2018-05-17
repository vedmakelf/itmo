function lesson8(task) {
    switch (task) {
        case 1:
            //Создать функцию которая выводит время в html и обновляет значения каждую секунду.Время выводить в формате чч: мм: cc, при этом часы, минуты и секунды отобразить разными цветами. 

            location.href = '#openModalLesson4';
            function clock() {
                var timeHourse;
                var timeMinutes;
                var timeSeconds;
                function pCreate() {
                    timeHourse = document.createElement('span');
                    timeHourse.id = 'timeHourse';
                    timeHourse.style.color = 'red';
                    timeMinutes = document.createElement('span');
                    timeMinutes.id = 'timeMinutes';
                    timeMinutes.style.color = 'green';
                    timeSeconds = document.createElement('span');
                    timeSeconds.id = 'timeSeconds';
                    timeSeconds.style.color = 'orange';
                    var p = document.createElement('p');
                    p.appendChild(timeHourse);
                    p.appendChild(document.createTextNode(':'));
                    p.appendChild(timeMinutes);
                    p.appendChild(document.createTextNode(':'));
                    p.appendChild(timeSeconds);
                    return p;
                }
                document.getElementById('time').appendChild(pCreate());

                var dateTime;
                var time = {
                    hours: '',
                    minutes: '',
                    seconds: ''
                };
                function color () {
                    var r = Math.floor(Math.random() * (256));
                    var g = Math.floor(Math.random() * (256));
                    var b = Math.floor(Math.random() * (256));
                    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
                };
                var timeNow = function () {
                    dateTime = new Date();
                    time.hours = dateTime.getHours() > 9 ? `${dateTime.getHours()}` : `0${dateTime.getHours()}`;
                    time.minutes = dateTime.getMinutes() > 9 ? `${dateTime.getMinutes()}` : `0${dateTime.getMinutes()}`;
                    time.seconds = dateTime.getSeconds() > 9 ? `${dateTime.getSeconds()}` : `0${dateTime.getSeconds()}`;
                    if (timeHourse.innerText !== time.hours) {
                        timeHourse.style.color = color();
                        timeHourse.innerText = time.hours;
                    }
                    if (timeMinutes.innerText !== time.minutes) {
                        timeMinutes.style.color = color();
                        timeMinutes.innerText = time.minutes;
                    }
                    if (timeSeconds.innerText !== time.seconds) {
                        timeSeconds.style.color = color();
                        timeSeconds.innerText = time.seconds;
                    }
                };

                timeNow();
                return timeNow;
            };
            var timeNow = clock();
            idTimerLesson8 = setInterval(timeNow, 1000);
            break;
        case 2:
            //Создать объект «Товар» включающий:
            //- свойства, такие как фото, артикул, описание и т.п.;
            //- метод, которому при вызове передается id пустого div элемента и в этот html элемент данный метод создаст и внесёт все необходимые html элементы, стили, и содержание для отображения всей информации хранящихся в свойствах объекта о данном товаре.Дизайн оформления информации в html о товаре – это ваше творчество.
            var product = {
                name: 'Highscreen Boost 3',
                image: 'image/1000kh1000_3.jpg',
                versionOS: 'Android 5.1',
                NumberOfSIMCards: 'поддержка двух SIM-карт',
                screen: 'экран 5", разрешение 1920x1080',
                camera: 'камера 13 МП, автофокус, F/2',
                memory: 'память 16 Гб, слот для карты памяти',
                standard: '3G, 4G LTE, LTE-A, Wi-Fi, Bluetooth, GPS, ГЛОНАСС',
                amountOfRAM: 'объем оперативной памяти 2 Гб',
                battery: 'аккумулятор 3000 мА⋅ч',
                overallDimensions: 'вес 140 г, ШxВxТ 71.40x141x9 мм',
                print: function (element) {
                    document.getElementById('openModalLesson4-div').style.width = '500px';
                    var div = document.createElement('div');
                    var div1 = document.createElement('div');
                    div1.style.width = '30%';
                    div1.style.cssFloat = 'left';
                    var img = document.createElement('img');
                    img.src = this.image;
                    img.style.width = '100%';
                    div1.appendChild(img);
                    var div2 = document.createElement('div');
                    div2.style.width = '70%';
                    div2.style.cssFloat = 'left';
                    div2.style.padding = '0 0 0 40px'
                    var ul = document.createElement('ul');
                    ul.innerText = this.name;
                    liCreate(this.versionOS)
                    liCreate(this.NumberOfSIMCards)
                    liCreate(this.screen)
                    liCreate(this.camera)
                    liCreate(this.memory)
                    liCreate(this.standard)
                    liCreate(this.amountOfRAM)
                    liCreate(this.battery)
                    liCreate(this.overallDimensions)
                    div2.appendChild(ul);
                    div1.style.width = '50px';
                    div.appendChild(div1);
                    div.appendChild(div2);
                    document.getElementById(element).appendChild(div);

                    function liCreate(str) {
                        var li = document.createElement('li');
                        li.innerText = str;
                        li.style.margin = '0 25px';
                        ul.appendChild(li);
                    }
                }

            }
            product.print('universal');
            location.href = '#openModalLesson4';
            break;
        case 3:
            //Создать светофор(красный, желтый, зелёный).Переключать цвет у светофора через каждые 2 сек сверху вниз и снизу вверх. 
            function trafficLightCreate() {
                var div = document.createElement('div');
                div.style.width = '150px';
                div.style.height = '450px';
                var buffer1 = document.createElement('div');
                buffer1.style.width = '150px';
                buffer1.style.height = '150px';
                buffer1.style.backgroundColor = 'black';
                buffer1.style.display = 'flex';
                buffer1.style.justifyContent = 'center';
                buffer1.style.alignItems = 'center';
                var buffer2 = document.createElement('div');
                buffer2.id = 'trafficLightRed';
                buffer2.style.width = '110px';
                buffer2.style.height = '110px';
                buffer2.style.backgroundColor = 'white';
                buffer2.style.borderRadius = '100%';
                buffer1.appendChild(buffer2);
                div.appendChild(buffer1);
                var buffer1 = document.createElement('div');
                buffer1.style.width = '150px';
                buffer1.style.height = '150px';
                buffer1.style.backgroundColor = 'black';
                buffer1.style.display = 'flex';
                buffer1.style.justifyContent = 'center';
                buffer1.style.alignItems = 'center';
                var buffer2 = document.createElement('div');
                buffer2.id = 'trafficLightYellow';
                buffer2.style.width = '110px';
                buffer2.style.height = '110px';
                buffer2.style.backgroundColor = 'white';
                buffer2.style.borderRadius = '100%';
                buffer1.appendChild(buffer2);
                div.appendChild(buffer1);
                var buffer1 = document.createElement('div');
                buffer1.style.width = '150px';
                buffer1.style.height = '150px';
                buffer1.style.backgroundColor = 'black';
                buffer1.style.display = 'flex';
                buffer1.style.justifyContent = 'center';
                buffer1.style.alignItems = 'center';
                var buffer2 = document.createElement('div');
                buffer2.id = 'trafficLightGreen';
                buffer2.style.width = '110px';
                buffer2.style.height = '110px';
                buffer2.style.backgroundColor = 'green';
                buffer2.style.borderRadius = '100%';
                buffer1.appendChild(buffer2);
                div.appendChild(buffer1);
                document.getElementById('universal').appendChild(div);

                var trafficLightColor = {
                    current: 'green',
                    next: 'yellow',
                };

                return function () {
                    switch (true) {
                        case trafficLightColor.current === 'green' && trafficLightColor.next === 'yellow':
                            document.getElementById('trafficLightRed').style.backgroundColor = 'white';
                            document.getElementById('trafficLightYellow').style.backgroundColor = 'yellow';
                            document.getElementById('trafficLightGreen').style.backgroundColor = 'white';
                            trafficLightColor.current = 'yellow';
                            trafficLightColor.next = 'red'
                            break;
                        case trafficLightColor.current === 'yellow' && trafficLightColor.next === 'red':
                            document.getElementById('trafficLightRed').style.backgroundColor = 'red';
                            document.getElementById('trafficLightYellow').style.backgroundColor = 'white';
                            document.getElementById('trafficLightGreen').style.backgroundColor = 'white';
                            trafficLightColor.current = 'red';
                            trafficLightColor.next = 'yellow'
                            break;
                        case trafficLightColor.current === 'red' && trafficLightColor.next === 'yellow':
                            document.getElementById('trafficLightRed').style.backgroundColor = 'white';
                            document.getElementById('trafficLightYellow').style.backgroundColor = 'yellow';
                            document.getElementById('trafficLightGreen').style.backgroundColor = 'white';
                            trafficLightColor.current = 'yellow';
                            trafficLightColor.next = 'green'
                            break;
                        case trafficLightColor.current === 'yellow' && trafficLightColor.next === 'green':
                            document.getElementById('trafficLightRed').style.backgroundColor = 'white';
                            document.getElementById('trafficLightYellow').style.backgroundColor = 'white';
                            document.getElementById('trafficLightGreen').style.backgroundColor = 'green';
                            trafficLightColor.current = 'green';
                            trafficLightColor.next = 'yellow'
                            break;
                    }
                };
            }
            var trafficLight = trafficLightCreate();
            idTimerLesson8 = setInterval(trafficLight, 2000);
            location.href = '#openModalLesson4';
            break
        case 4:
            //Доделать задачу с занятия(игра на внимательность).Генерация игрового поля заданного размера.Суть - дана таблица с числами, распаложенными в случайном порядке в ячейках таблицы.Числа идут по порядку от 1 до N * N.Все числа разного размера и цвета.
            //весь код в game.js
            break;
    }
}