const readline = require('readline-sync');

module.exports = class Tic {
  constructor(config){
    this.lastTurn = config.lastTurn;
    this.gameStatus = [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ];
    // this.isGameActive = true;
    this.numOfMoves = 0;
    this.quitGame = false;
    this.gameWon = false;

    //include size of board
    //keep track of score


  }// constructor

  updateBoard(){
    const currentBoard = this.gameStatus;

    let printBoard = "";
    currentBoard.forEach( x => {
      printBoard += x.join(" ") + "\n";
    // TODO: consider not adding \n to the last line
    });

    // console.log(printBoard)
    return printBoard;
  }

  prompt(testLocation, xOrO){
    //only for testing
    if(testLocation) return testLocation;

    const player = (this.numOfMoves%2 === 0) ? "1" : "2";

    const inputLocation = readline.question(`Player ${player} enter a coord x,y to place your ${xOrO} or enter 'q' to give up: `);

    return inputLocation;
  }

  currentTurn(){
    return (this.lastTurn === "X")? "O" : "X";
  }

  updateGameStatus(testLocation){
    const xOrO = this.currentTurn();
    const location = this.prompt(testLocation, xOrO);

    if(location === "q"){
      this.quitGame = true;
      return "\nGoodbye. Thanks for playing.";
    }

    //if location is any format other than "num,num" return not valid
    const validLocation = location.match( /\d\,\d/ );
    const errorMsg = `\n${location} is not a valid coord. Try again... \n`;

    if(!validLocation) return errorMsg;

    const translateLocation = location.match( /(\d+)/g );
    //adjust location using index 0
    const positionX = parseInt(translateLocation[0])-1;
    const positionY = parseInt(translateLocation[1])-1;

    //Error if coordinates are greater than size of board
    //TODO instead of 2 use size of board
    // consider extracting into a functions
    if(positionX > 2 || positionX < 0 || positionY > 2 || positionY < 0) return errorMsg;

    const currentPositionStatus = this.gameStatus[positionX][positionY];

    // update gameStatus if location is not occupied
    if (currentPositionStatus === '.'){
      this.gameStatus[positionX][positionY] = xOrO;
      this.lastTurn = xOrO;
      this.numOfMoves += 1;
      // TODO: don't hardcode 5 size of board x 2 - 1
      if(this.numOfMoves >= 5 && this.checkForWin(xOrO)){
        return `\nMove accepted, well done you've won the game!\n\n${this.updateBoard()}`;
      }
      if(this.numOfMoves === 9 && !this.gameWon){
        return `\nMove accepted, draw game!\n\n${this.updateBoard()}`;
      }
      //TODO: get rid of this console.log
      console.log("\nMove accepted, here's the current board: \n")
      return this.updateBoard();
    } else {
      //this not working
      return `\nOh no, a piece is already at ${location}! Try again...\n`;
    }
  }

  playGame(){
    console.log("Welcome to Tic Tac Toe! \n\nHere's the current board:\n");
    console.log(this.updateBoard());

    //num 9
    while (!this.quitGame && !this.gameWon && this.numOfMoves < 9) {
      console.log(this.updateGameStatus());
    }
  }

  isWinner(line, player){
    // let checkLine = ;
    if(line.every(x => x === player)){
      this.gameWon = true;
    }

  };

  checkForWin(player){
    // rename
    const x = 3;

    //check rows for win
    let rows = [...this.gameStatus];

    rows.forEach( row => {
      this.isWinner(row, player);
    })

    //why is return not working
    // console.log("=======", this.gameWon);

    const gameStatus = [...this.gameStatus].flat();
    // console.log(gameStatus);

    //check cols;
    let cols = [];

    for(let j = 0; j < x; j++){
    // creates an array within cols (i.e. cols will be an array of arrays)
      cols[j] = [];
      for ( let i = j; i < gameStatus.length; i+=x ) {
        cols[j].push(gameStatus[i]);
      }
    }

    cols.forEach( col => {
      this.isWinner(col, player);
    });


    //check diagonals
    let diagonal1 = [];
    for ( let j = 0; j < gameStatus.length; j+=(x+1) ) {
      diagonal1.push(gameStatus[j]);
    }
    this.isWinner(diagonal1, player);


    let diagonal2 = [];

    for ( let j = (x-1); j < gameStatus.length-1; j+=(x-1) ) {
      diagonal2.push(gameStatus[j]);
    }
    this.isWinner(diagonal2, player);

    return this.gameWon;
  }

};


  // play again if winner/draw is delared

//   return true;
// }

// updateBoard(){
//   // update board if isPlayValid is true
//
//   return this.currentBoard;
// }

// could use % but then X is always even
// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })


// (-1,2) is interpreted 1,2.
// 1,2,3
// testcode inside tic.js, should not mix with production code (note in README)
// no magic numbers!!!
// xOrO - ?better name
// Looping is not necessary for 3x3 but code allows you use greater size boards
//Wrote tests and attempted TDD. I have limited experience with testing but very keen to learn more.
