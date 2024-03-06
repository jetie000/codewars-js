const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let times = -1;
let devs = 0;
let soc1 = []
let socRest = []
rl.on('line', (input) => {
    if (times === -1)
        times = Number(input);
    else {
        if (devs === 0)
            devs = Number(input)
        else {
            socRest = input.split(' ').map(el => Number(el)).sort().filter(el => el !== 2)
            let indexBorder = socRest.findIndex(el => el > 2)
            if (indexBorder !== -1) {
                console.log("This way");
                soc1 = socRest.slice(0, indexBorder - 1)
                socRest = socRest.slice(indexBorder - 1)
                for (let i = 0; i < soc1.length; i++) {
                    if (socRest[0]) {
                        socRest[0] = socRest[0] - 1
                        if (socRest[0] === 2)
                            socRest.shift()
                    }
                    else {
                        console.log('No');
                        break;
                    }
                }
                if(socRest[0])
                    console.log("Yes");
            }
            else {
                if (socRest.length < 3)
                    console.log("Yes");
                else
                    console.log("No");
            }

            console.log(soc1);
            console.log(socRest);
            devs = 0
            times--;
            if (times === 0)
                rl.close();
        }
    }
})