function topThreeWords(text) {
    let reg = /[a-z]+[']*[a-z]*/gi;
    let arr1 = text.toLowerCase().match(reg).sort() || [];
    let arr1Temp = []
    while(arr1.length > 0){
        let arr1El = arr1.filter(str => str === arr1[0])
        arr1Temp.push({
            el: arr1El[0],
            num: arr1El.length
        })
        arr1 = arr1.slice(arr1El.length);
    }
    arr1Temp.sort((a, b) => b.num - a.num);
    let arr2 = []
    while (arr1Temp.length > 0 && arr2.length < 3){
        arr2.push(arr1Temp[0].el)
        arr1Temp.shift();
    }
    return arr2;
}

console.log(topThreeWords("a a a  b  c c  d d d d  e e e e e"));
console.log(topThreeWords("a a a c b b"));
console.log(topThreeWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"));
console.log(topThreeWords("  //wont won't won't "));
console.log(topThreeWords("  , e   .. "));



// Write a function that, given a string of text (possibly with punctuation and line-breaks),
// returns an array of the top-3 most occurring words, in descending order of the number of occurrences.