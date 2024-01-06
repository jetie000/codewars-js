function moveZeros(arr) {
    return arr.filter(a => a !== 0).concat(arr.filter(a => a === 0))
}

console.log(moveZeros([1,2,0,1,0,1,0,3,0,1]));

// move zeros to the end of an array