const readline = require('readline-sync')

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

    //include size of board

  }// constructor

  updateBoard(){
    const currentBoard = this.gameStatus;

    let printBoard = "";
    currentBoard.forEach( x => {
      printBoard += x.join(" ") + "\n";
    // TODO: consider not adding \n to the last line
    })

    // console.log(printBoard)
    return printBoard;
  }

  prompt(testLocation){
    //only for testing
    if(testLocation) return testLocation;

    const player = (this.numOfMoves%2 === 0) ? "1" : "2";

    const inputLocation = readline.question(`Player ${player} enter a coord x,y to place your X or enter 'q' to give up: `);

    return inputLocation;
  }

  currentTurn(){
    return (this.lastTurn === "X")? "O" : "X"
  }

  updateGameStatus(testLocation){
    const location = this.prompt(testLocation);
    const translateLocation = location.match( /(\d)/g );

    if(location === "q"){
      this.quitGame = true;
      return "\nGoodbye. Thanks for playing.";
    }


    //if location is any format other than "num,num" return not valid
    const validLocation = location.match( /\d\,\d/ );
    const errorMsg = `\n${location} is not a valid coord. Try again... \n`

    if(!validLocation) return errorMsg;


    //adjust location using index 0
    const positionX = parseInt(translateLocation[0])-1;
    const positionY = parseInt(translateLocation[1])-1;

    //Error if coordinates are greater than size of board
    //TODO instead of 2 use size of board
    if(positionX > 2 || positionY > 2) return errorMsg;


    const xOrO = this.currentTurn();
    const currentPositionStatus = this.gameStatus[positionX][positionY];

    // update gameStatus if location is not occupied
    if (currentPositionStatus === '.'){
      this.gameStatus[positionX][positionY] = xOrO;
      this.lastTurn = xOrO;
      this.numOfMoves += 1;
      //TODO: get rid of this console.log
      console.log("\nMove accepted, here's the current board: \n")
      return this.updateBoard();
    } else {
      //this not working
      return `\nOh no, a piece is already at ${location}! Try again...\n`;
    }
  }

  playGame(){
    console.log("Welcome to Tic Tac Toe! \n\nHere's the current board:\n")
    console.log(this.updateBoard());

    while (!this.quitGame) {
      console.log(this.updateGameStatus());
    }
  }


};


// https://glebbahmutov.com/blog/unit-testing-cli-programs/

//[ [1, 2, 3], [4, 5, 6] ].flat()
//.join(" ")

// isPlayValid(){
// if(this.numOfMoves === 9){
//   return `Draw game`;
// }

//
//
//
//   const plays = this.currentBoard.match( /(\.|\w)/g );
//
//   // console.log(plays);
//
//   // use regex to get all non white spaces - i.e. capture all . and X or 0
//
//   // hopefully this an array
//
//
//   // must not be already filled
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
