// making a tic tac toe game 
const board = document.querySelector(".board")
const cells = [...document.querySelectorAll('.cells')]

let xCells = [], oCells = []
let player, nextPlayer, winner = "Draw", filledCellsCount = 0

const handleClick = (e)=>{
    // The board always has the current player's class (either "x" or "o")
    // Determine the current player and the next one based on the board's class
    player = board.classList[1]; 
    nextPlayer = player == "x" ? "o" : "x";

    e.target.classList.add(player);

    // Update the board's class to indicate whose turn it is
    board.classList.remove(player);
    board.classList.add(nextPlayer);

    // Remove the click event listener from the clicked cell to prevent further clicks
    e.target.removeEventListener("click", handleClick);

    // Record the cell index (1-indexed) for the current player
    if(player == "x"){
        xCells.push(Number(e.target.dataset.index))
    }
    else{
        oCells.push(Number(e.target.dataset.index))
    }
    filledCellsCount += 1
    
    // Check for a win condition only if at least 5 cells are filled, cause it requires at least 5 filled cells to win
    if (filledCellsCount >= 5){
        if(checkEndGame()){
            alert(winner === "Draw" ? "It's a draw!" : `Player ${winner.toUpperCase()} wins!`);
            restartGame();
        }
    }
}


cells.forEach(cell =>{
    cell.addEventListener("click", handleClick)
})


function checkEndGame(){
    const winConditions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8], 
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ] // wining conditions for tic tac toe game using 1-indexed counting

    let playerCells = player == "x" ? xCells : oCells; // ternary operator works like a if else conditions search for more
    
    // checks if the any of those wining conditions are found in the current players array
    const win = winConditions.some(condition =>{ 
        return condition.every(i =>{
            return playerCells.includes(i)
        })
    })
    if(win){
        winner = player;
    }
    return win || filledCellsCount == 9;
}


function restartGame(){
    // reset everything to initial state
    xCells = []
    oCells = []
    filledCellsCount = 0
    winner = "Draw"
    board.classList.remove("x", "o")
    board.classList.add("o")
    cells.forEach(cell => {
        cell.addEventListener("click", handleClick)
        cell.classList.remove("x", "o")
    });
}