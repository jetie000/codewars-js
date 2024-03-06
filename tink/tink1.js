
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let times = -1;
rl.on('line', (input) => {
    if (times === -1)
        times = Number(input);
    else
        if (times === 0)
            rl.close();
        else {
            if (input.split('').sort().join('') === 'FFIKNOT')
                console.log('Yes');
            else
                console.log('No');
            times--;
        }
})