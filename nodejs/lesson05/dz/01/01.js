function reversePrint(linkedList) {
    var arr = [];
    while (linkedList !== null) {
        arr.push(linkedList.value);
        linkedList = linkedList.next;
    }
    arr = arr.reverse();
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}

var someList = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

reversePrint(someList);