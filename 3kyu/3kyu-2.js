function spiralize(n) {
    let arr = (new Array(n)).fill(undefined)
    arr.forEach((el, i) => {
        arr[i] = (new Array(n)).fill(0)
    })
    let dirX = 1, dirY = 0
    let i = 0, j = 0
    while (true) {
        arr[i][j] = 1
        if (arr[i + dirY] === undefined || arr[i + dirY][j + dirX] === undefined || (arr[i + dirY * 2] !== undefined && arr[i + dirY * 2][j + dirX * 2] === 1)) {
            if (arr[i - dirY * 2][j - dirX * 2] === 0 ||
                arr[Math.floor(arr.length / 2)][Math.floor(arr.length / 2)] === 1) {
                break
            }
            if (dirX === 1) {
                dirY = 1
                dirX = 0
            } else
                if (dirY === 1) {
                    dirX = -1
                    dirY = 0
                } else
                    if (dirX === -1) {
                        dirY = -1
                        dirX = 0
                    } else
                        if (dirY === -1) {
                            dirX = 1
                            dirY = 0
                        }
            if (arr[i + dirY * 2][j + dirX * 2] === 1)
                break
        }
        i += dirY
        j += dirX
    }
    arr.forEach(a => console.log(a))
    return arr;
}

console.log(spiralize(5));
console.log(spiralize(10));
console.log(spiralize(15));

// Your task, is to create a NxN spiral with a given size.

// For example, spiral with size 5 should look like this:

// 00000
// ....0
// 000.0
// 0...0
// 00000