var recoverSecret = function (triplets) {
    let resp = ''
    let occur = []
    for (let i = 0; i < triplets.length; i++) {
        for (let j = 0; j < 3; j++) {
            if (!occur.find(el => el.letter === triplets[i][j]))
                occur.push({
                    letter: triplets[i][j],
                    after: []
                })
            for (let k = j + 1; k < 3; k++) {
                if (occur.find(el => el.letter === triplets[i][j])?.after.find(a => a === triplets[i][k]) === undefined)
                    occur.find(el => el.letter === triplets[i][j])?.after.push(triplets[i][k])
            }
        }
    }
    resp += occur.find(el => el.after.length === 0).letter
    for (let i = 0; i < occur.length - 1; i++) {
        for (let j = 0; j < occur.length; j++) {
            let isDecline = false
            let letter = occur[j].letter
            if(resp.split('').some(resEl => resEl === letter)){
                isDecline = true
            }
            occur[j].after.forEach(el => {
                if (!resp.split('').find(respEl => respEl === el))
                    isDecline = true
            })
            if(!isDecline){
                resp = occur[j].letter + resp
                break;
            }
        }
    }
    return resp;
}

triplets1 = [
    ['t', 'u', 'p'],
    ['w', 'h', 'i'],
    ['t', 's', 'u'],
    ['a', 't', 's'],
    ['h', 'a', 'p'],
    ['t', 'i', 's'],
    ['w', 'h', 's']
]

console.log(recoverSecret(triplets1));


// There is a secret string which is unknown to you. Given a collection of random triplets from the string, recover the original string.

// A triplet here is defined as a sequence of three letters such that each letter occurs somewhere before the next in the given string.
//  "whi" is a triplet for the string "whatisup".