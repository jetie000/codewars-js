function diff(str) {
    if (!isNaN(str))
        return '0'
    if (str.length === 1)
        return '1'

    let operator = str[1]

    //OPERATORS + -

    if (operator === '+' || operator === '-') {
        if (str[3] !== '(') {
            let diffPart2 = diff(str.slice(5, -1))
            if (!isNaN(diff(str[3])) && !isNaN(diffPart2)) {
                if (operator === '-')
                    return String(Number(diff(str[3])) - Number(diffPart2))
                else
                    return String(Number(diff(str[3])) + Number(diffPart2))
            }
            if (diff(str[3]) === diffPart2) {
                if (diffPart2 === '0')
                    return 0
                else {
                    if (operator === '-')
                        return '0'
                    else
                        return '(* 2 ' + diffPart2 + ')'
                }
            }
            if (diffPart2 === '0')
                return diff(str[3])
            return (diff(str[3]) === '0' ? diffPart2 : ('(' + operator + ' ' + diff(str[3]) + ' ' + diffPart2 + ')'))
        }
        else {
            let brack = 1, index = 0
            for (let i = 4; brack !== 0; i++) {
                if (str[i] === '(')
                    brack++
                if (str[i] === ')')
                    brack--
                index = i
            }
            let diffPart1 = diff(str.slice(3, index + 1))
            let diffPart2 = diff(str.slice(index + 2, -1))

            if (!isNaN(diffPart1) && !isNaN(diffPart2)) {
                if (operator === '-')
                    return String(Number(diffPart1) - Number(diffPart2))
                else {
                    return String(Number(diffPart1) + Number(diffPart2))
                }
            }
            if (diffPart1 === diffPart2) {
                if (diffPart2 === '0')
                    return 0
                else {
                    if (operator === '-')
                        return '0'
                    else
                        return '(* 2 ' + diffPart2 + ')'
                }
            }
            if (diffPart2 === '0') {
                return diffPart1
            }
            return '(' + operator + ' ' + diffPart1 + ' ' + diffPart2 + ')'
        }
    }

    //OPERATOR *

    if (operator === '*') {
        if (str[3] !== '(') {
            let str1 = str.match(/[0-9x]+/g)[0]
            let str2 = str.slice(4 + str1.length, -1)
            let diffPart1 = diff(str1)
            let diffPart2 = diff(str2)
            if (diffPart1 === diffPart2) {
                if (diffPart2 === '0')
                    return '0'
                else
                    return diff('(^ ' + str2 + ' 2)')
            }
            if (diffPart2 === '0' && isNaN(diffPart1)) {
                return '(* ' + str2 + ' ' + diffPart1 + ')'
            }
            if (diffPart1 === '0' && isNaN(diffPart2)) {
                return '(* ' + str1 + ' ' + diffPart2 + ')'
            }
            if (!isNaN(diffPart1) && !isNaN(diffPart2) && (diffPart1 === '0' || diffPart2 === '0')) {
                return String((diffPart2 === '0' ? Number(diffPart1) * Number(str2) : 0)
                    + (diffPart1 === '0' ? Number(str1) * Number(diffPart2) : 0))
            }
            return '(+ ' + str2 + ' ' + '(* ' + str1 + ' ' + diffPart2 + '))'
        }
        else {
            let brack = 1, index = 0
            for (let i = 4; brack !== 0; i++) {
                if (str[i] === '(')
                    brack++
                if (str[i] === ')')
                    brack--
                index = i
            }
            let str1 = str.slice(3, index + 1)
            let str2 = str.slice(index + 2, -1)
            let diffPart1 = diff(str1)
            let diffPart2 = diff(str2)
            if (diffPart1 === diffPart2) {
                if (diffPart2 === '0')
                    return 0
                else
                    return diff('(^ ' + str2 + ' 2)')
            }
            if (diffPart2 === '0' && isNaN(diffPart1)) {
                return '(* ' + str2 + ' ' + diffPart1 + ')'
            }
            if (diffPart1 === '0' && isNaN(diffPart2)) {
                return '(* ' + str1 + ' ' + diffPart2 + ')'
            }
            if (!isNaN(diffPart1) && !isNaN(diffPart2) && (diffPart1 === '0' || diffPart2 === '0')) {
                return String((diffPart2 === '0' ? Number(diffPart1) * Number(str2) : 0)
                    + (diffPart1 === '0' ? Number(str1) * Number(diffPart2) : 0))
            }
            return '(+ (* ' + diff(str1) + ' ' + str2 + ') (* ' + str1 + ' ' + diff(str2) + '))'
        }
    }

    //OPERATOR /

    if (operator === '/') {
        if (str[3] !== '(') {
            let str1 = str.match(/[0-9x]+/g)[0]
            let str2 = str.slice(4 + str1.length, -1)
            let diffPart1 = diff(str1)
            let diffPart2 = diff(str2)
            if (diffPart1 === diffPart2) {
                return '0'
            }
            if (diffPart2 === '0') {
                return diffPart1 === '0' ? '0' : String(1 / str2)
            }
            return (diffPart1 === '0' ?
                '(/ ' + (diffPart2 === '1' ? '-' + String(Number(str1) * Number(diffPart2)) : '(* -' + str1 + ' ' + diffPart2 + ')') + ' (^ ' + str2 + ' 2)' + ')' :
                '(/ (- ' + str2 + ' (* ' + str1 + ' ' + diffPart2 + ')) (^ ' + str2 + ' 2)' + ')')
        }
        else {
            let brack = 1, index = 0
            for (let i = 4; brack !== 0; i++) {
                if (str[i] === '(')
                    brack++
                if (str[i] === ')')
                    brack--
                index = i
            }
            let str1 = str.slice(3, index + 1)
            let str2 = str.slice(index + 2, -1)
            let diffPart1 = diff(str[3])
            let diffPart2 = diff(str.slice(5, -1))
            if (diff(str2) === '0') {
                return '(/ (* ' + diffPart1 + ' ' + str2 + ') (^ ' + str2 + ' 2))'
            }
            return '(/ (- (* ' + diffPart1 + ' ' + str2 + ') (* ' + str1 + ' ' + diffPart2 + ')) (^ ' + str2 + ' 2))'
        }
    }

    //OPERATOR ^

    if (str.indexOf('^') === 1) {
        let dop = ''
        let diffDop = diff(str.slice(3, -3))
        if (diffDop !== '0' && diffDop !== '1')
            dop = '(* ' + diffDop + ' '
        if (str[str.length - 2] === '2')
            return dop + '(* ' + str[str.length - 2] + ' ' + str.slice(3, -3) + ')' + (dop.length > 0 ? ')' : '')
        else
            return dop + '(* ' + str[str.length - 2] + ' (^ ' + str.slice(3, -3) + ' ' + (str[str.length - 2] - 1) + '))' + (dop.length > 0 ? ')' : '')
    }
    let strInBrack = str.slice(5, -1)
    if (str.indexOf('sin') === 1) {
        if (diff(strInBrack) === '1')
            return '(cos ' + strInBrack + ')'
        else
            return '(* ' + diff(strInBrack) + ' (cos ' + strInBrack + '))'
    }
    if (str.indexOf('cos') === 1) {
        if (diff(strInBrack) === '1')
            return '(* -1 (sin ' + strInBrack + '))'
        else
            return '(* ' + diff(strInBrack) + ' (* -1 (sin ' + strInBrack + ')))'
    }
    if (str.indexOf('tan') === 1) {
        if (diff(strInBrack) === '1')
            return '(^ (cos ' + strInBrack + ') -2)'
        else
            return '(* ' + diff(strInBrack) + ' (^ (cos ' + strInBrack + ') -2))'
    }
    if (str.indexOf('exp') === 1) {
        if (diff(strInBrack) === '1')
            return '(exp ' + strInBrack + ')'
        else
            return '(* ' + diff(strInBrack) + ' (exp ' + strInBrack + '))'
    }
    if (str.indexOf('ln') === 1) {
        if (diff(str.slice(4, -1)) === '1')
            return '(/ 1 ' + str.slice(4, -1) + ')'
        else
            return '(* ' + diff(str.slice(4, -1)) + ' (/ 1 ' + str.slice(4, -1) + '))'
    }
    let parts = str.match(/[x0-9]/g)
    if (parts.length >= 2) {

    }
}

// console.log(diff('(* (- (+ 3 x) 5) (+ 1 x))'));
// console.log(diff('(* (- (+ x 3) 5) (+ 1 x))'));
// console.log(diff('(* (- (+ x 3) 5) 1)'));
// console.log(diff('(* x 3)'));
// console.log(diff('(* (+ x 1) 3)'));
// console.log(diff('(/ (- x (sin x)) 3)'));
// console.log(diff('(/ (- x (sin x)) (+ (cos x) 4))'));
// console.log(diff('(^ (* x 5) 3)'));
// console.log(diff('(cos (* 2 x))'));
// console.log(diff('(tan (* x x))'));

// console.log(diff("5"));
// console.log(diff("x"));
// console.log(diff("(+ x x)"));
// console.log(diff("(* (* x 3) (* x 2))"));
// console.log(diff("(- x x)"));
// console.log(diff("(* x x)"));
// console.log(diff("(* 3 (^ x 2))"));
// console.log(diff("(^ x 2)"));
// console.log(diff("(^ x 3)"));
// console.log(diff("(sin x)"));
// console.log(diff("(cos x)"));
console.log(diff("(/ x x)"));
// console.log(diff("(+ x (+ x x))"));
console.log(diff("(/ 13 (+ 1 x))"));
console.log(diff("(* 59 x)"));
// console.log(diff("(cos (* 2 2))"));


// In this kata your task is to differentiate a mathematical expression given as a string in prefix notation. The result should be the derivative of the expression returned in prefix notation.

// To simplify things we will use a simple list format made up of parentesis and spaces.

// The expression format is (func arg1) or (op arg1 arg2) where op means operator, func means function and arg1, arg2 are aguments to the operator or function. For example (+ x 1) or (cos x)

// The expressions will always have balanced parentesis and with spaces between list items.

// Expression operators, functions and arguments will all be lowercase.

// Expressions are single variable expressions using x as the variable.

// Expressions can have nested arguments at any depth for example (+ (* 1 x) (* 2 (+ x 1)))