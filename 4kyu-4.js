function simplify(poly) {
    let resp = ''
    let arr = (poly[0] === '-' ? poly : '+' + poly).match(/[-+][1-9]*[a-z]+/g)
    for (let i = 0; i < arr.length; i++) {
        let resultNum = 0
        let num = ''
        let str = ''
        arr[i].split('').forEach((el) => {
            if (!el.match(/[a-z]/))
                num += el
            else
                str += el
        })
        if (num[num.length - 1] === '+' || num[num.length - 1] === '-')
            num += '1'
        resultNum += Number(num)
        str = str.split('').sort().join('');
        console.log(str);

        for (let j = i + 1; j < arr.length; j++) {
            let num2 = ''
            let str2 = ''
            arr[i].split('').forEach((el) => {
                if (!el.match(/[a-z]/))
                    num2 += el
                else
                    str2 += el
            })
            if (num2[num2.length - 1] === '+' || num2[num2.length - 1] === '-')
                num2 += '1'
            str2 = str2.split('').sort().join('');
            if (str === str2)
                resultNum += Number(num2)
        }
        
    }
}

console.log(simplify("dc+dcba"));
console.log(simplify("2xy-yx"));
console.log(simplify("-abc+3a+2ac"));
console.log(simplify("xzy+zby"));

// When we attended middle school were asked to simplify mathematical expressions like "3x-yx+2xy-x"
// (or usually bigger), and that was easy-peasy ("2x+xy"). But tell that to your pc and we'll see!
// "cb+cba" -> "bc+abc", "2xy-yx" -> "xy", "-a+5ab+3a-c-2a" -> "-c+5ab"