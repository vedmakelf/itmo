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
                    }
                    e.stopPropagation();
                }
            };
            break;
            //Реализовать счётчик нажатий на кнопку: Дана кнопка внутри неё записана цифра.При клике на кнопку – её значение должно увеличиваться на единицу.
        case 2:
            //Реализовать счётчик нажатий на кнопку: Дана кнопка внутри неё записана цифра.При клике на кнопку – её значение должно увеличиваться на единицу.
            location.href = '#openModalLesson9';
            var openModalLesson9Task2 = document.getElementById('openModalLesson9Task2');
            openModalLesson9Task2.style.display = 'flex';
            var count = function () {
                var counter = 0;
                return function () {
                    return ++counter;
                }
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
                switch (event.key) {
                    case '`':
                        keyboardDown(event)
                        break;
                    case '1':
                        keyboardDown(event)
                        break;
                }
                function keyboardDown(event) {
                    write.value += event.key;
                    var li = SearchingText(event.key);
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
                        }
                    }
                }
                event.stopPropagation();
            }
            break
        case 4:
            break;
    }
}