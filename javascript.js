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

    return {show, update, victory, clear}
})()