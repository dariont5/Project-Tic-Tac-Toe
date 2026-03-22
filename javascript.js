// IIFE for gameboard
const Gameboard = (function () {
    // initialize state
    const state = [[0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]]

    function show() {
        console.log(state)
        return
    }

    // update board state
    function update(vertical_position, horizontal_position, player) {
        state[vertical_position].splice(horizontal_position, 1, player)
        return
    }

    function sum(...nums) {
        return nums.reduce((acc, val) => acc + val, 0)
    }

    // check victory
    /*
    8 possible victories: 3 vertical, 3 horizontal, 2 diagonal
    player 1 value = 1, player 2 value = -1
    This method allows summing to determine the victor,
    as 3 in a row means the sum will be -3 or +3
    Returns 1 for player 1 victory, 
    Returns -1 for player 2 victory,
    Returns 0 for tie,
    Returns false for ongoing
    */
    function victory() {
        // vertical victories
        const ver0 = sum(state[0][0], state[1][0], state[2][0]);
        const ver1 = sum(state[0][1], state[1][1], state[2][1]);
        const ver2 = sum(state[0][2], state[1][2], state[2][2]);

        // horizontal victories
        const hor0 = sum(state[0][0], state[0][1], state[0][2]);
        const hor1 = sum(state[1][0], state[1][1], state[1][2]);
        const hor2 = sum(state[2][0], state[2][1], state[2][2]);

        // diagonal victories
        const dia0 = sum(state[0][0], state[1][1], state[2][2]);
        const dia1 = sum(state[2][0], state[1][1], state[0][2]);

        // all 
        const all = [ver0, ver1, ver2, hor0, hor1, hor2, dia0, dia1];

        // check possibilities
        for (const wincon of all) {
            if (wincon === 3) {
                return 1
            }
            else if (wincon === -3) {
                return -1
            }
        }

        // check if moves remaining
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state[i][j] === 0) {
                    return false
                }
            }
        }

        // returns tie
        return 0
    }

    function clear() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                state[row][col] = 0;
            }
        }
    }

    function validate(vertical_position, horizontal_position) {
        if (state[vertical_position][horizontal_position] == 0) {
            return true
        } else {
            return false
        }
    }

    return {show, update, victory, clear, validate}
})()

// valid move check: if Gameboard state shows a 0, it is a valid move
// *to-do: add function validate into Gameboard
// function validate(vertical pos, horizontal pos) {
// return true if slot contains 0
// return false if else
// }

// Game:
// set player
// foreach(button => etc)
// on-click: validate move, update gameboard, show svg, check victory, change player
// validate done
// how to incorporate position finding? - slightly cheated with chatGPT .dataset attribute

// initiallizing required variables
let player = 1;
let onGoing = true

// inputs
let player1 = document.querySelector('.player1');
let player2 = document.querySelector('.player2');
let victoryDisplay = document.querySelector('#winner');

// dictionary
// usage: 
// positions[index] returns array
// positions[index][0] returns vertical postion
// positions[index][1] returns horizontal postion
const positions = {
    0: [0, 0],
    1: [0, 1],
    2: [0, 2],
    3: [1, 0],
    4: [1, 1],
    5: [1, 2],
    6: [2, 0],
    7: [2, 1],
    8: [2, 2],
}

// assign positions of each box and add event handler
const boxes = document.querySelectorAll('.box')
boxes.forEach((box, index) => {
    box.dataset.position = index;
    box.addEventListener("click", handleEvent)
});

// validates move, updates move, shows svg, checks victory, changes player
function handleEvent(event) {
    const vertical_position = positions[event.target.dataset.position][0]
    const horizontal_position = positions[event.target.dataset.position][1]
    console.log(vertical_position, horizontal_position)

    if (onGoing === false) {
        return console.log("The game is over");
    }

    if (Gameboard.validate(vertical_position, horizontal_position) == false) {
        return console.log("invalid move")
    }

    Gameboard.update(vertical_position, horizontal_position, player)

    // show svg
    if (player == 1) {
        event.target.querySelector('.x').classList.add('show')
        console.log(event.target.classList)
    } else
    if (player == -1) {
        event.target.querySelector('.o').classList.add('show')
        console.log(event.target.classList)
    }

    function checkVictoryInTurn() {
    if (Gameboard.victory() == 1) {
        endGame()
        let victor = player1.value
        if (victor === "") {
            victoryDisplay.value = "Player1"
            return console.log(victor)
        }
        victoryDisplay.value = `${victor}`
        return console.log(victor)
    } else
    if (Gameboard.victory() == -1) {
        endGame()
        let victor = player2.value
        if (victor === "") {
            victoryDisplay.value = "Player2"
            return console.log(victor)
        }
        victoryDisplay.value = `${victor}`
        return console.log(victor)
    } else
    if (Gameboard.victory() === 0) {
        endGame()
        let victor = "Tie"
        victoryDisplay.value = `${victor}`
        return console.log(victor)
    }}

    setTimeout(checkVictoryInTurn, 10)

    switchPlayers()
}

// switch players
function switchPlayers() {
    if (player == 1) {
        player = -1;
    } else
    if (player == -1) {
        player = 1;
    }
}

// handle the game ending
function endGame() {
    onGoing = false;
}

// handle game restart
// clear board, clear svg, reset initial player, set onGoing = true
let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', () => {
    Gameboard.clear()
    boxes.forEach((box) => box.querySelector('.x').classList.remove("show"))
    boxes.forEach((box) => box.querySelector('.o').classList.remove("show"))
    victoryDisplay.value = ""
    player = 1
    onGoing = true
});
