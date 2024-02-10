function lastDigit(as) {
    switch (as.length) {
        case 0: return 1;
        case 1: return as[0] % 10
    }
    let num = as[as.length - 2] % 100
    let pow = as[as.length - 1]
    if (pow === 0)
        num = 1
    else {
        pow = as[as.length - 1] % 4
        if(pow < 2 && as[as.length - 1] > 4){
          pow += 4
        }
    }
    if (num === 0 && as[as.length - 2] > 0){
        num = as[as.length - 2]
        if(num > 1000)
          num = num % 1000
    }
    num = Math.pow(num, pow)
    let nextAs = as.slice(0, -1)
    nextAs[nextAs.length - 1] = num
    return lastDigit(nextAs)
}

// console.log(lastDigit([]));
// console.log(lastDigit([0, 0]));
// console.log(lastDigit([0, 0, 0]));
// console.log(lastDigit([1, 2, 3]));
// console.log(lastDigit([3, 4, 5]));
// console.log(lastDigit([4, 3, 6]));
// console.log(lastDigit([7, 6, 21]));
// console.log(lastDigit([12, 30, 21]));
// console.log(lastDigit([123232, 694022, 140249]));
// console.log(lastDigit([499942, 898102, 846073]));
// console.log(lastDigit([937640,767456,981242]));
// console.log(lastDigit([2,2,2,0]));
console.log(lastDigit([2,2,101,2]));

// For a given list [x1, x2, x3, ..., xn] compute the last (decimal) digit of x1 ^ (x2 ^ (x3 ^ (... ^ xn))).

// E. g., with the input [3, 4, 2], your code should return 1 because 3 ^ (4 ^ 2) = 3 ^ 16 = 43046721.

// Beware: powers grow incredibly fast. For example, 9 ^ (9 ^ 9) has more than 369 millions of digits. lastDigit has to deal with such numbers efficiently.