function getQuadrantNumber(x, y) {
    try {
        switch (true) {
            case x === 0: case y === 0:
                throw new Error;
                break;
            case x > 0 && y > 0:
                return 1;
            case x > 0 && y < 0:
                return 4;
            case x < 0 && y > 0:
                return 2;
            case x < 0 && y < 0:
                return 3;
        }
    } catch (e) {
    }
}

console.log(`x = 0, y = 0: Номер четверти - ${getQuadrantNumber(0, 0)}`);
console.log(`x = 1, y = 0: Номер четверти - ${getQuadrantNumber(1, 0)}`);
console.log(`x = 1, y = 1: Номер четверти - ${getQuadrantNumber(1, 1)}`);
console.log(`x = -1, y = 1: Номер четверти - ${getQuadrantNumber(-1, 1)}`);
console.log(`x = -1, y = -1: Номер четверти - ${getQuadrantNumber(-1, -1)}`);
console.log(`x = 1, y = -1: Номер четверти - ${getQuadrantNumber(1, -1)}`);