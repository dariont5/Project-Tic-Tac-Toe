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
    return {show, update}
})()