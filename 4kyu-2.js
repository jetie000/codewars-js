snail = function (array) {
    let arr = array.slice() || []
    let arrResp = [];
    let i = 0, j = 0;
    let dirX = 1, dirY = 0;
    for (let t = 0; t < arr[0].length * arr[0].length; t++) {
        arrResp.push(arr[i][j])
        if (dirX === 1 && arr[i + dirY][j + dirX] === undefined) {
            dirX = 0
            dirY = 1
        } else
        if (dirY === 1 && (arr[i + dirY] === undefined || arr[i + dirY][j + dirX] === undefined)) {
            dirX = -1
            dirY = 0
        } else
        if (dirX === -1 && arr[i + dirY][j + dirX] === undefined) {
            dirX = 0
            dirY = -1
        } else
        if (dirY === -1 && (arr[i + dirY] === undefined || arr[i + dirY][j + dirX] === undefined)) {
            dirX = 1
            dirY = 0
        } else
        arr[i][j] = undefined;
        j += dirX
        i += dirY
    }
    return arrResp
}

console.log(snail([[]]));
console.log(snail([[1]]));
console.log(snail([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
console.log(snail([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]));
console.log(snail([[1]]));

// Given an n x n array, return the array elements arranged
// from outermost elements to the middle element, traveling clockwise.