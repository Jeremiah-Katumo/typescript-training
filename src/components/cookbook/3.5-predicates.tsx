
type Dice = 1 | 2 | 3 | 4 | 5 | 6 | 7

// function isDice(value: number): value is Dice {
//     return [1, 2, 3, 4, 5, 6, 7].includes(value)
// }
// Actually, any condition works for TypeScript. 
// Return true and TypeScript will think value is Dice:
function isDice(value: number): value is Dice {
    return true
}

function rollDice(input: number) {
    if (isDice(input)) {
        return input
    } else {
        return undefined
    }
}

rollDice(2)