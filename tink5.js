
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let events = -1
let pairCount = -1
let counts = []
let pairs = []
rl.on('line', (input) => {
    if (events === -1 && pairCount === -1) {
        events = Number(input.split(' ')[2]);
        pairCount = Number(input.split(' ')[1]);
        return;
    }
    if (counts.length === 0) {
        counts = input.split(' ').map(el => Number(el))
        return;
    }
    if (pairs.length < pairCount) {
        pairs.push([Number(input.split(' ')[0]), Number(input.split(' ')[1])])
        return;
    }
    if (input[0] === '?')
        console.log(counts[Number(input.split(' ')[1]) - 1]);
    else {
        let child = Number(input.split(' ')[1])
        let num = Number(input.split(' ')[2])
        console.log('PAIRS ' + pairs);
        console.log('PAIRS LENGTH ' + pairs.length);
        pairs.filter(pair => pair[0] === child || pair[1] === child)
            .map(pair2 => pair2[0] === child ? pair2[1] : pair2[0])
            .forEach(childToSend => counts[childToSend - 1] += num)
    }
    events--;
    if (events === 0) {
        rl.close();
        return;
    }
})