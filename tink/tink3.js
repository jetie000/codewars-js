const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let bank = -1;
let prices = []
let resp = 0
rl.on('line', (input) => {
    if (bank === -1)
        bank = Number(input.split(' ')[1]);
    else {
        prices = input.split(' ').map(el => Number(el))
        let sortedPrices = prices.slice().sort()
        resp = sortedPrices[0] - 1 < bank ? sortedPrices[0] - 1 : bank // 0
        let sumSorted = 0 // 0
        while (sortedPrices[0]) {
            sumSorted += sortedPrices[0]
            let toCarry = sumSorted + resp + 1
            if (toCarry > bank)
                break;
            let i = 0
            while (true) {
                if (sortedPrices[1]) {
                    if (i > sortedPrices[1] - sortedPrices[0] - 1)
                        break
                }
                else {
                    if (i > bank - toCarry)
                        break
                }
                let checkTemp = check(toCarry + i)

                if (checkTemp > resp)

                    resp = checkTemp
                else
                    break;
                i++
            }
            sortedPrices.shift()
        }
        console.log(resp);
        rl.close();
    }
})

function check(sum) {
    let sumTemp = sum
    for (let i = 0; i < prices.length; i++) {
        if (sumTemp - prices[i] >= 0)
            sumTemp -= prices[i]
    }
    return sumTemp
}