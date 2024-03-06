function validateBattlefield(field) {
    let validShipCells = []
    let ships = []
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[i][j] === 1 && !validShipCells.find(cell => cell.x === j && cell.y === i)) {
                if ((field[i - 1] && (field[i - 1][j - 1] === 1 || field[i - 1][j + 1] === 1)) ||
                    (field[i + 1] && (field[i + 1][j - 1] === 1 || field[i + 1][j + 1] === 1)))
                    return false
                let currentShip = []
                validShipCells.push({ x: j, y: i })
                let dirX = 0, dirY = 0;
                if (field[i][j + 1] === 1)
                    dirX = 1
                if (field[i + 1] && field[i + 1][j] === 1)
                    dirY = 1
                if (dirX === 0 && dirY === 0) {
                    currentShip.push({ x: j, y: i })
                    ships.push(currentShip)
                }
                else {
                    currentShip.push({ x: j, y: i })
                    for (let k = 1; k <= 4; k++) {
                        if (field[i + k * dirY] && field[i + k * dirY][j + k * dirX] === 1) {
                            if ((field[i + k * dirY - 1] && (field[i + k * dirY - 1][j + k * dirX - 1] === 1 || field[i + k * dirY - 1][j + k * dirX + 1] === 1)) ||
                                (field[i + k * dirY + 1] && (field[i + k * dirY + 1][j + k * dirX - 1] === 1 || field[i + k * dirY + 1][j + k * dirX + 1] === 1)))
                                return false
                            validShipCells.push({ x: j + k * dirX, y: i + k * dirY })
                            currentShip.push({ x: j + k * dirX, y: i + k * dirY })
                        }
                        else
                            break;
                    }
                    ships.push(currentShip)
                }
            }
        }
    }
    console.log(validShipCells.length);
    ships.forEach(s => s.forEach(ss => console.log(ss)))
    return ships.filter(ship => ship.length === 3).length === 2 &&
        ships.filter(ship => ship.length === 4).length === 1 &&
        ships.filter(ship => ship.length === 1).length === 4 &&
        ships.filter(ship => ship.length === 2).length === 3 &&
        ships.length === 10
}

console.log(validateBattlefield([
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]));

console.log(validateBattlefield([
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]));

// Write a method that takes a field for well-known board game "Battleship" as an argument and
// returns true if it has a valid disposition of ships, false otherwise.
// Argument is guaranteed to be 10*10 two-dimension array. Elements in the array are numbers,
// 0 if the cell is free and 1 if occupied by ship.