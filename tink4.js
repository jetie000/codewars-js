
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let nodeNum = -1
let compNum = -1
let copms = []
let nodes = []
let finalNode = {}

let prices = []

function getCompanies(node) {
    if (node)
        return [node.comp].concat(node.children.map(child => getCompanies(child)))
    return []
}

const isGoodArr = (arr) => (new Set(arr.flat(Infinity))).size === compNum

const isGoodNode = (node) => isGoodArr(getCompanies(node))

const getPrices = (node) => {
    if (node) {
        let price = node.price
        if (node.children.length > 0) {
            price += node.children.reduce((acc, el) => acc + getPrices(el), 0)
        }
        if (isGoodNode(node)) {
            prices.push(price);
        }
        return price
    }
    return 0;
}

rl.on('line', (input) => {
    if (nodeNum === -1 && compNum === -1) {
        nodeNum = Number(input.split(' ')[0]);
        compNum = Number(input.split(' ')[1]);
        return;
    }
    if (copms.length < compNum) {
        copms.push(input)
        return;
    }
    if (nodes.length < nodeNum) {
        let resp = input.split(' ')
        nodes.push({
            parent: Number(resp[0]),
            price: Number(resp[1]),
            comp: resp[2],
            children: []
        })
        if (nodes.length === nodeNum) {
            finalNode = nodes[0]
            for (let i = 1; i < nodes.length; i++) {
                nodes[nodes[i].parent - 1].children.push(nodes[i])
            }
            
            getPrices(finalNode);
            prices.sort()
            if(prices[0])
                console.log(prices[0]);
            else
                console.log(-1);

            rl.close();
            return;
        }
    }
})


