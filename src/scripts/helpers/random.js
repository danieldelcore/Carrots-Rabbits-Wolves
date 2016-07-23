
// Get a random floating point number between `min` and `max`.
export function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// Get a random integer between `min` and `max`.
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Will return an array with numbers from min - max
// Intended to be used in conjunction with randomShuffle
export function gernerateArrayIndexes(min, max) {
    const arr = [];
    for (let i = min; i < max; i++) {
        arr.push(i);
    }

    return arr;
}

// Will return an array of positions
// Intended to be used in conjunction with randomShuffle
export function gernerateArrayPositions(width, height) {
    const arr = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            arr.push({ x, y });
        }
    }
    return arr;
}

// Get a set of uniquely random numbers (Fisher–Yates Shuffle)
export function randomShuffle(array) {
    const newArr = array;
    let m = newArr.length;
    let t;
    let i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = newArr[m];
        newArr[m] = newArr[i];
        newArr[i] = t;
    }

    return newArr;
}
