// function pigIt(str) {
//     let words = str.split(/[^a-zA-Z]/)
//     let index = 0
//     return (str + ' ').split('').reduce((acc, el, i) => {
//         if (el === words[index][0] && (!str[i - 1] || str[i - 1] === ' '))
//             return acc
//         if ((el === ' ') && (!str[i - 1] || str[i - 1] === words[index][words[index].length - 1])) {
//             index++
//             return acc + words[index - 1][0] + 'ay '
//         }
//         return acc + el
//     }, '').slice(0, -1)
// }

function pigIt(str) {
    return str.replace(/[a-zA-Z]+/g, (w) => {
        let letter = w.split('').splice(0, 1)
        return w.slice(1) + letter + 'ay'
    })
}

console.log(pigIt('Pig latin is cool'));
console.log(pigIt('Hello world !'));
console.log(pigIt('O tempora o mores !'));
console.log(pigIt('This is my string'));


// Move the first letter of each word to the end of it,
// then add "ay" to the end of the word. Leave punctuation marks untouched.