function isSolved(board) {
    const isWon = (subBoard) => {
        if (subBoard.every(el => el === 1))
            return 1
        if (subBoard.every(el => el === 2))
            return 2
    }
    for (let i = 0; i < board.length; i++) {
        const isWonX = isWon([board[i][0], board[i][1], board[i][2]])
        const isWonY = isWon([board[0][i], board[1][i], board[2][i]]) 
        if(isWonX)
            return isWonX
        if(isWonY)
            return isWonY
    }
    const isWonDia = isWon([board[0][0], board[1][1], board[2][2]])
    const isWonDiaRev = isWon([board[2][0], board[1][1], board[0][2]])
    if (isWonDia || isWonDiaRev)
        return isWonDia ? isWonDia : isWonDiaRev
    if(board.reduce((acc, el)=>acc.concat(el), []).find(el => el === 0) !== undefined)
        return -1
    return 0
}

console.log(isSolved([[0, 0, 1],
[0, 1, 2],
[2, 1, 0]]))

// If we were to set up a Tic-Tac-Toe game, we would want to know whether the board's current state is solved, wouldn't we? Our goal is to create a function that will check that for us!

// Assume that the board comes in the form of a 3x3 array, where the value is 0 if a spot is empty, 1 if it is an "X", or 2 if it is an "O", like so:

// [[0, 0, 1],
//  [0, 1, 2],
//  [2, 1, 0]]

