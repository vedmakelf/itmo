function getFreeLand(area, bed) {
    try {
        var sArea = area[0] * 100;
        var ratio = area[1].split(':');
        for (var i = 0; i < ratio.length; i++) {
            ratio[i] = parseInt(ratio[i]);
        }
        var widthArea = Math.sqrt(sArea) / ratio[1];
        var lengthArea = Math.sqrt(sArea) / ratio[0];

        if (area[0] <= 0) {
            throw new Error('Не задана площадь участка');
        }
        if (bed[0] <= 0
            || bed[1] <= 0) {
            throw new Error('Не задана площадь грядки');
        }
        if (widthArea < bed[0]
            || lengthArea < bed[0]
            || widthArea < bed[1]
            || lengthArea < bed[1]) {
            throw new Error('Размер грядки больше размера участка');
        }

        return sArea % (bed[0] * bed[1]);

    } catch (e) {
        console.log(e.message);
        return undefined;
    }
}

var result = getFreeLand([100, '1:1'], [15, 25]);
if (result) {
    console.log(`${result}кв.м.`);
}
var result = getFreeLand([0, '1:1'], [15, 25]);
if (result) {
    console.log(`${result}кв.м.`);
}
var result = getFreeLand([100, '1:1'], [5, 0]);
if (result) {
    console.log(`${result}кв.м.`);
}
var result = getFreeLand([6, '3:2'], [40, 28]);
if (result) {
    console.log(`${result}кв.м.`);
}
