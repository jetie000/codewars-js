function hand(holeCards, communityCards) {
    let cardsByNum = holeCards.concat(communityCards).sort((a, b) => {
        let aStr = a.slice(0, -1)
        let bStr = b.slice(0, -1)
        if (!isNaN(aStr) && !isNaN(bStr))
            return Number(aStr) - Number(bStr)
        if (!isNaN(aStr) && isNaN(bStr))
            return -1
        if (isNaN(aStr) && !isNaN(bStr))
            return 1
        let arr = ['A', 'K', 'Q', 'J']
        return arr.findIndex(b => b === bStr) - arr.findIndex(a => a === aStr)
    });
    let cardsByMas = cardsByNum.slice().sort((a, b) => a.charCodeAt(a.length - 1) - b.charCodeAt(b.length - 1))
    let types = ['nothing', 'pair', 'two pair', 'three-of-a-kind', 'straight', 'flush', 'full house', 'four-of-a-kind', 'straight-flush']
    let existRanks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
    let ranksTemp = cardsByNum.reverse().map(c => c.slice(0, -1))
    let allRanks = ranksTemp.filter((c, i) => ranksTemp.indexOf(c) === i)

    let ranks = allRanks.slice(0, 5)
    let type = 'nothing'

    let pairs = []
    let triplets = []

    for (let i = 0; i < cardsByNum.length - 1; i++) {
        for (let j = i + 1; j < cardsByNum.length; j++) {
            if (cardsByNum[i].slice(0, -1) === cardsByNum[j].slice(0, -1)) {
                if (!pairs.find(pair => pair[0].slice(0, -1) === cardsByNum[i].slice(0, -1)))
                    pairs.push([cardsByNum[i], cardsByNum[j]])
                if (!triplets.find(pair => pair[0].slice(0, -1) === cardsByNum[i].slice(0, -1)) && j === i + 2)
                    triplets.push([cardsByNum[i], cardsByNum[i + 1], cardsByNum[j]])
                if (j === i + 3 && types.findIndex(t => t === 'four-of-a-kind') > types.findIndex(t => t === type)) {
                    type = 'four-of-a-kind'
                    ranks = []
                    ranks.push(cardsByNum[i].slice(0, -1))
                    ranks.push(allRanks.find(c => c !== ranks[0]))
                }
            }
        }
    }

    if (types.findIndex(t => t === 'full house') > types.findIndex(t => t === type) && triplets.length > 0 && pairs.length > 0) {
        for (let i = triplets.length - 1; i >= 0; i--) {
            for (let j = pairs.length - 1; j >= 0; j--) {
                if (triplets[i][0].slice(0, -1) !== pairs[j][0].slice(0, -1)) {
                    type = 'full house'
                    ranks = [triplets[i][0].slice(0, -1), pairs[j][0].slice(0, -1)]
                }
            }
        }
    }
    if (types.findIndex(t => t === 'straight') > types.findIndex(t => t === type)) {
        let cardsByNum2 = cardsByNum.filter((c, i) => cardsByNum.findIndex(cn => cn.slice(0, -1) === c.slice(0, -1)) === i)
        console.log(cardsByNum)
        console.log(cardsByNum2)
        if (cardsByNum2.length > 4)
            for (let i = 0; i <= 2 + cardsByNum2.length - cardsByNum.length; i++) {
                let isStraight = true
                for (let j = i + 1; j < i + 5; j++) {
                    if (existRanks.indexOf(cardsByNum2[i].slice(0, -1)) !== existRanks.indexOf(cardsByNum2[j].slice(0, -1)) - j + i) {
                        isStraight = false
                        break;
                    }
                }
                if (isStraight) {
                    type = 'straight'
                    let index = allRanks.findIndex(r => r === cardsByNum2[i].slice(0, -1))
                    ranks = allRanks.slice(index, index + 5)
                    let isFlush = true
                    ranks.forEach(r => {
                        if (!cardsByNum.find(c => r + cardsByNum[3].slice(-1) === c))
                            isFlush = false
                    })
                    if (isFlush)
                        type = 'straight-flush'
                    break;
                }
            }
    }
    if (types.findIndex(t => t === 'flush') > types.findIndex(t => t === type)) {
        let el = cardsByMas.slice(0, 3).filter((c, i) => c.slice(-1) === cardsByMas[i + 4].slice(-1))
        if (el.length > 0) {
            type = 'flush'
            ranks = cardsByMas.reverse().filter(c => c.slice(-1) === el[0].slice(-1)).map(c => c.slice(0, -1)).slice(0, 5)
        }

    }
    if (types.findIndex(t => t === 'three-of-a-kind') > types.findIndex(t => t === type) && triplets.length > 0) {
        type = 'three-of-a-kind'
        ranks = []
        ranks.push(triplets[triplets.length - 1][0].slice(0, -1))
        ranks = ranks.concat(allRanks.filter(c => c !== ranks[0]).slice(0, 2))
    }
    if (types.findIndex(t => t === 'pair') > types.findIndex(t => t === type) && pairs.length > 0) {
        ranks = []
        if (pairs.length > 1) {
            type = 'two pair'
            ranks.push(pairs[pairs.length - 2][0].slice(0, -1))
            ranks.push(pairs[pairs.length - 1][0].slice(0, -1))
            ranks.push(cardsByNum.find(c => c.slice(0, -1) !== ranks[0] && c.slice(0, -1) !== ranks[1]).slice(0, -1))
        }
        else {
            type = 'pair'
            ranks.push(pairs[0][0].slice(0, -1))
            ranks = ranks.concat(allRanks.filter(c => c !== ranks[0]).slice(0, 3))
        }
    }

    return { type: type, ranks: ranks };
}

console.log(hand(['K♠', 'A♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']));
console.log(hand(['K♠', 'Q♦'], ['J♣', 'Q♥', '9♥', '2♥', '3♦']));
console.log(hand(['K♠', 'J♦'], ['J♣', 'K♥', '9♥', '2♥', '3♦']));
console.log(hand(['4♠', '9♦'], ['J♣', 'Q♥', 'Q♠', '2♥', 'Q♦']));
console.log(hand(['Q♠', '2♦'], ['J♣', '10♥', '9♥', 'K♥', '3♦']));
console.log(hand(['A♠', 'K♦'], ['J♥', '5♥', '10♥', 'Q♥', '3♥']));
console.log(hand(['A♠', 'A♦'], ['K♣', 'K♥', 'A♥', 'Q♥', '3♦']));
console.log(hand(['2♠', '3♦'], ['2♣', '2♥', '3♠', '3♥', '2♦']));
console.log(hand(['8♠', '6♠'], ['7♠', '5♠', '9♠', 'J♠', '10♠']));


// Texas Hold'em is a Poker variant in which each player is given two "hole cards".
// Players then proceed to make a series of bets while five "community cards" are dealt.
// If there are more than one player remaining when the betting stops, a showdown takes place in which players reveal their cards.
// Each player makes the best poker hand possible using five of the seven available cards (community cards + the player's hole cards).