function lesson4(task) {
    switch (task) {
        case 1:
            //Заданы два массива A = [12, 4, 3, 10, 1, 20]  B = [-3, -7, -100, -33] необходимо их объединить в один массив C добавив массив B в конец(в начало) A. 
            var a = [12, 4, 3, 10, 1, 20];
            var b = [-3, -7, -100, -33];
            var c1 = a.concat(b);
            var c2 = b.concat(a);
            alert(`c1=${c1}
c2=${c2}`);
            break;
        case 2:
            //Одномерным массивом задана доска 3 на 3 var area = [null, null, null, null, null, null, null, null, null].Необходимо сформировать игровое поле состоящее из квадратов для крестиков - ноликов  в HTML.При появлении в массиве 0 - ля рисовать нолик, 1 - цы крестик.Пример: [1, null, 0, null, 1, null, null, null, null] на поле 2 - а крестика, и 1 - н нолик.
            location.href = '#openModalLesson4';
            var arr = [1, null, 0, null, 1, null, null, null, null];
            var arrPlayingField = new Array
            var arrPlayingFieldRow = new Array();
            for (var i = 0, j = -1; i < arr.length; i++) {
                arrPlayingField[i] = document.createElement('div');
                arrPlayingField[i].idName = 'playingField-' + i;
                switch (arr[i]) {
                    case 1:
                        arrPlayingField[i].innerHTML = 'X';
                        break;
                    case 0:
                        arrPlayingField[i].innerHTML = 'O';
                        break;
                    case null:
                        arrPlayingField[i].innerHTML = '';
                        break;
                }
                if (i % 3 === 0) {
                    arrPlayingFieldRow.push(document.createElement('div'));
                    j++;
                }
                arrPlayingFieldRow[j].appendChild(arrPlayingField[i]);
            }
            while (document.getElementById('playingField').firstChild) {
                document.getElementById('playingField').removeChild(document.getElementById('playingField').firstChild);
            }
            for (var i = 0; i < arrPlayingFieldRow.length; i++) {
                document.getElementById('playingField').appendChild(arrPlayingFieldRow[i]);
            }
            break;
        case 3:
            //Задан массив - [12, 4, 3, 10, 1, 20].Удалить из него наименьшее и наибольшее значение.
            var arr = [12, 4, 3, 10, 1, 20];
            var arr1 = arr.slice();
            var indexMax = arr1.indexOf(Math.max.apply(Math, arr1));
            var indexMin = arr1.indexOf(Math.min.apply(Math, arr1));
            arr1.splice(indexMax, 1);
            arr1.splice(indexMin, 1);
            alert(`старый массив=${arr}
новый массив=${arr1}`);
            break;
        case 4:
            //Задан массив - [12, 4, 3, 10, 1, 20].Необходимо отсортировать его в порядке возрастания, при этом не использовать готовый метод sort и методы разобранные на занятии.Снабдите комментариями каждую строку.
            //сортировка вставками
            var arr = [12, 4, 3, 10, 1, 20];
            for (var i = 1; i < arr.length; i++) { //цикл для перебора
                for (var j = i; j > 0 && arr[j - 1] > arr[j]; j--) {//цикл для поиска места вставки
                    [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]; //меняем элементы месятами
                }
            }
            alert(`отсортированный массив=${arr}`);
            break;
    }
}