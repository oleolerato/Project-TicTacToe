let gameIsOver = false;
let winner = "";
let winnerDeclared = false;
let currentPlayer = "X"

//Module for gameBoard

const gameBoard = (() => {
  const gameBrd = document.querySelectorAll('#gameBoard div')
  let board = ["", "", "", "", "", "", "", "",""]
  
  gameBrd.forEach((cell) => {
    cell.addEventListener('click', () => {
      cell.textContent = currentPlayer;
    })
  })
  return({gameBrd, board})
})()