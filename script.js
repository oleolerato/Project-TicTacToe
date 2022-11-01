let gameIsOver = false;
let winner = "";
let winnerDeclared = false;
let currentPlayer = "X";

// Factory Function for Players
const Player = (a, b) => {
  const plyrSign = a;
  let positions = [];
  
  const play = function(a, b) {
    let fieldIndex = +a.dataset.value;
    a.textContent = plyrSign
    positions.push(fieldIndex)
    
    for(i = 0; i < 9; i++){
      if (i == fieldIndex){b[i] = plyrSign}
    }
    
  };
  
  const checkForWin = function(a){
    for(const code of a){
      if(code.every(item => positions.includes(item))){
      gameIsOver = true;
      winnerDeclared = true;
      winner = plyrSign;
    }
  }
};

  const resetPositions = () => positions = [];

  return ({resetPositions, play, checkForWin});
};
//Module for gameBoard
const gameBoard = (() => {
  const gameBrd = document.querySelectorAll('#gameBoard div');
  let board = ["", "", "", "", "", "", "", "",""];
  const winningCodes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7 ,8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
    ];
  let filledCount = 0;
  const message = document.querySelector('#resultsDisplay')
      
  
  const playerX = Player('X');
  const playerO = Player('O');
  
  // Control for display
  const displayController = (() => gameBrd.forEach((cell) => {
    
    cell.addEventListener('click', () => {
      if(cell.textContent == ""){
        ++filledCount
        switch(currentPlayer){
          case 'X':
            cell.style.color = "#5378F9"
            playerX.play(cell,board);
            playerX.checkForWin(winningCodes)
            currentPlayer = "O"
            break;
          case 'O':
            cell.style.color = "#3B1F19"
            playerO.play(cell, board)
            playerO.checkForWin(winningCodes)
            currentPlayer = "X"
            break;
        }
      }
      checkGameIsOver()
    });
  })
  )();
  
  // Checks if game is over
  const checkGameIsOver = () => {
    message.textContent = ""
    if(gameIsOver == true || filledCount == 9){
      displayMessage();
      resetGame();
    }
  };
  
  // Resets Game and Gameboard
 const resetGame = function(){
  currentPlayer = "X";
  gameIsOver = false;
  winnerDeclared = false;
  winner = "";
  board = ["","","","","","","","",""];
  filledCount = 0;
  playerX.resetPositions();
  playerO.resetPositions();
  gameBrd.forEach((cell) => cell.textContent = "");
 };

// Displays message for winner
 const displayMessage = () => {
      if(!winnerDeclared){
      message.textContent = "Maybe you guys should try winning, 🙄"
      } else{
        message.textContent = `Player ${winner} wins! 🥳`
      }
  }
  
  return({winningCodes, gameBrd, board});
})();