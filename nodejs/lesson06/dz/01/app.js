class DataList {
    /**
     * иницилизация списка, принимает набор чисел в качестве параметров
     */
    constructor() {
        this._value = null;
        this._next = null;
        this._length = 0;

        if (arguments.length !== 0) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
        }
    }

    /**
     * добавление элемента в конец списка
     * @param {number} value значение
     */
    add(value) {
        if (this._value === null) {
            this._value = value;
            this._next = null;
        } else {
            var next = this._lastNext();
            next._next = {
                _value: value,
                _next: null
            };
        }
        this._length++;
    }

    /**
     * вставка элемента по индексу
     * @param {number} index индекс
     * @param {number} value значение
     */
    insert(index, value) {
        if (index >= this._length) {
            this.add(value)
        } else {
            var next = this;
            for (var i = 0; i < index; i++) {
                next = next._next;
            }
            next._next = {
                _value: next._value,
                _next: next._next
            };
            next._value = value;
            this._length++;
        }
    }

    /**
     * возвращает значение по индексу
     * @param {number} index индекс
     */
    get(index) {
        if (index >= this._length) {
            throw new error('Индекс вне диапозона списка');
        } else {
            var next = this;
            for (var i = 0; i < index; i++) {
                next = next._next;
            }
            return next._value;
        }
    }

    /**
     * удаляет первое найденное значение
     * @param {number} value значение
     */
    remove(value) {
        var next = this;
        var lastNext = next;
        for (var i = 0; i < this._length; i++) {
            if (next._value === value) {
                switch (true) {
                    case i === 0 && next._next === null:
                        next._value = null;
                        this._length--;
                        return;
                    case i === 0 && next._next !== null:
                        next._value = next._next._value;
                        next._next = next._next._next;
                        this._length--;
                        return;
                    default:
                        lastNext._next = next._next;
                        this._length--;
                        return;
                }
            } else {
                if (next._next === null) {
                    return;
                } else {
                    lastNext = next;
                    next = next._next;
                }
            }
        }
    }

    /**
     * удаляет элемент по индексу и возвращает удаленное значение
     * @param {number} index индекс
     */
    removeAt(index) {
        if (index >= this._length) {
            throw new error('Индекс вне диапозона списка');
        } else {
            var next = this;
            var lastNext = next;
            for (var i = 0; i < index; i++) {
                lastNext = next;
                next = next._next;
            }
            var value = next._value;
            switch (true) {
                case index === 0 && next._next === null:
                    next._value = null;
                    this._length--;
                    return value;
                case index === 0 && next._next !== null:
                    next._value = next._next._value;
                    next._next = next._next._next;
                    this._length--;
                    return value;
                default:
                    lastNext._next = next._next;
                    this._length--;
                    return value;
            }
        }
    }

    /**
     * очищает список
     * */
    clear() {
        this._value = null;
        this._next = null;
        this._length = 0;
    }

    /**
     * возвращает True, если элемент с указанным значением есть в списке, в противном случае False
     * @param {number} value значение
     */
    contains(value) {
        var next = this;
        for (var i = 0; i < this._length; i++) {
            if (next._value === value) {
                return true;
            } else {
                next = next._next;
            }
        }
        return false;
    }

    /**
     * возвращает длинну списка
     * */
    len() {
        return this._length;
    }

    /**
     * возвращает true если список не пустой, если пустой возвращает false
     */
    isEmpty(){
        if (this._length === 0) {
            return false;
        } else {
            return true;
        }
    }

    [Symbol.iterator]() {
        let id = 0;
        var obj = this;
        return {
            next() {
                if (id < obj._length) {
                return {
                    value: obj.get(id++),
                    done: false
                }
                } else {
                    return {
                        done: true
                    }
                }
            }
        }
    }

    _lastNext() {
        var next = this;
        while (next._next) {
            next = next._next;
        }
        return next;
    }
}


var list = new DataList(5, 4);
console.dir(list);
list.add(5);
console.dir(list);
list.insert(1, 15);
console.dir(list);
console.log(list.get(0));
list.remove(4);
console.dir(list);
console.dir(list.removeAt(0));
console.dir(list);
console.dir(list.contains(4));
console.dir(list.len());
list.clear()
console.dir(list);

var list1 = new DataList(3, 5, 4);
console.dir(`list isEmpty: ${list.isEmpty()}`);
console.dir(`list1 isEmpty: ${list1.isEmpty()}`);

for (let num of list1) {
    console.log(num);
}