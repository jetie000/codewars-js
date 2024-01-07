function nextSmaller(n) {
    let toSwitch = []
    let arr = String(n).split('').map(el => Number(el))
    for (let i = arr.length - 1; i >= 1; i--) {
        for (let j = i - 1; j >= 0; j--) {
            if (arr[i] < arr[j]) {
                toSwitch.push({
                    index: i,
                    index2: j,
                })
            }
        }
    }
    if (toSwitch.length === 0)
        return -1
    let pair = toSwitch.sort((a, b) => b.index2 - a.index2)[0]
    console.log(pair);
    let temp = arr[pair.index]
    arr[pair.index] = arr[pair.index2]
    arr[pair.index2] = temp
    arr = arr.slice(0, pair.index2 + 1).concat(arr.slice(pair.index2 + 1).sort((a, b) => b - a))
    if (String(Number(arr.join(''))).length !== String(n).length)
        return -1;
    return Number(arr.join(''))
}

console.log(nextSmaller(21));
console.log(nextSmaller(907));
console.log(nextSmaller(531));
console.log(nextSmaller(135));
console.log(nextSmaller(2071));
console.log(nextSmaller(1027));
console.log(nextSmaller(414));
console.log(nextSmaller(1234567908));
console.log(nextSmaller(241042687002));
console.log(nextSmaller(8609345));

// Write a function that takes a positive integer and returns the next smaller positive integer containing the same digits.
// For example:
// nextSmaller(21) == 12
// nextSmaller(531) == 513
// nextSmaller(2071) == 2017