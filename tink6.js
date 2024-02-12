
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let queryNum = -1
let arr = []

rl.on('line', (input) => {
    if (queryNum === -1) {
        queryNum = Number(input.split(' ')[1]);
        return;
    }
    if (arr.length === 0) {
        arr = input.split(' ').map(el => Number(el))
        return;
    }
    if (input[0] === '?') {
        let params = input.split(' ').map(el => Number(el))
        console.log(Math.max(...arr.map((el, i) => Math.min(el, (i + 1) * params[3] + params[4]))
            .filter((el, i) => i + 1 >= params[1] && i + 1 <= params[2])
        ));
    } else {
        let params = input.split(' ').map(el => Number(el))
        arr = arr.map((el, i) => i + 1 >= params[1] && i + 1 <= params[2] ? el + params[3] : el);
    }

    queryNum--;
    if (queryNum === 0) {
        rl.close();
        return;
    }
})


