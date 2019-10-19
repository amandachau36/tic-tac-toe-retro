const Tic = require('./lib/tic.js');
// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })


const ticTacToe = new Tic({
  lastTurn: "O"
});

// console.log(ticTacToe.currentTurn())

// ticTacToe.prompt();
//
// console.log(ticTacToe.updateBoard());
//
// ticTacToe.isPlayValid();
// ticTacToe.updateGameStatus();
// ticTacToe.updateBoard();

ticTacToe.playGame();
