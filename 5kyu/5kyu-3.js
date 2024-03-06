function zeros(n) {
    let zeros = 0
    let div = 5
    while (true) {
        if (n < div)
            break;
        zeros += Math.floor(n / div);
        div *= 5
    }
    return zeros
}

console.log(zeros(0));
console.log(zeros(5));
console.log(zeros(6));
console.log(zeros(30));

//   Write a program that will calculate the number of trailing zeros in a factorial of a given number.