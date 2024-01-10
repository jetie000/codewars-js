function expand(expr) {
    let step = Number(expr.split('^')[1])
    if (step === 0)
        return '1'

    let leftNum = expr.match(/\([-0-9]*/)
    if (leftNum[0] !== '(' && leftNum[0] !== '(-')
        leftNum = Number(leftNum[0].slice(1))
    else
        leftNum = leftNum[0].length === 1 ? 1 : -1

    let letter = expr.match(/[a-z]/)[0];

    let rightNum = expr.match(/[+-]*[0-9]+\)/g)
    if (rightNum[0] !== ')')
        rightNum = Number(rightNum[0].slice(0, -1))
    else
        rightNum = 0
    if (rightNum === 0)
        return (step * Math.pow(leftNum, step)) + letter + (step !== 1 ? '^'+step : '')
    let coefs = [1, 1]
    for (let i = 0; i < step - 1; i++) {
        coefs.push(1);
        let temp = coefs.slice()
        for (let j = 1; j < coefs.length - 1; j++) {
            temp[j] = coefs[j - 1] + coefs[j]
        }
        coefs = temp.slice()
    }
    let resp = ''
    for (let i = 0; i <= step; i++) {
        let num = Math.pow(leftNum, step - i) * Math.pow(rightNum, i) * coefs[i];
        resp += ((num > 0 && i !== 0) ? '+' : (num < 0 ? '-' : '')) + (((num !== 1 && num !== -1) || step - i === 0) ? Math.abs(num) : '') +
            (step - i !== 0 ? letter + (step - i !== 1 ? '^' + (step - i) : '') : '')
    }
    return resp
}


console.log(expand("(-x+1)^2"));
console.log(expand("(p-1)^3"));
console.log(expand("(p-0)^3"));
console.log(expand("(2f+4)^6"));
console.log(expand("(9f+0)^2"));
console.log(expand("(-12t+43)^2"));
console.log(expand("(10d+15)^5"));

// The purpose of this kata is to write a program that can do some algebra.

// Write a function expand that takes in an expression with a single, one character
// variable, and expands it. The expression is in the form (ax+b)^n where a and b are integers
// which may be positive or negative, x is any single character variable, and n is a natural number.
// If a = 1, no coefficient will be placed in front of the variable. If a = -1, a "-" will be
// placed in front of the variable.