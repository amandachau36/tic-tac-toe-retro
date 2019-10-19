const readline = require('readline-sync')

module.exports = class Tic {
  constructor(config){
    this.lastTurn = config.lastTurn;
    this.gameStatus = [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ];
    this.isGameActive = true;
    this.numOfMoves = 0;

    //include size of board

  }// constructor

  updateBoard(){
    const currentBoard = this.gameStatus;

    let printBoard = "";
    currentBoard.forEach( x => {
      printBoard += x.join(" ") + "\n";
    // TODO: consider not adding \n to the last line
    })

    console.log(printBoard);
    return printBoard;
  }

  prompt(testLocation){
    //only for testing
    if(testLocation) return testLocation ;

    const inputLocation = readline.question("Player 1 enter a coord x,y to place your X or enter 'q' to give up: ");

    return inputLocation;
  }

  currentTurn(){
    return (this.lastTurn === "X")? "O" : "X"
  }

  updateGameStatus(testLocation){
    const location = this.prompt(testLocation);
    const translateLocation = location.match( /(\d)/g );

    //adjust location using index 0
    const positionX = parseInt(translateLocation[0])-1;
    const positionY = parseInt(translateLocation[1])-1;

    //if location is any format other than "num,num" return not valid
    const validLocation = location.match( /\d\,\d/ );

    //Check if play is in the correct format or if coordinates are greater than size of board
    //TODO instead of 2 use size of board
    if(!validLocation || positionX > 2 || positionY > 2){
      return `${location} is not a valid coord. Try again...`;
    }

    const xOrO = this.currentTurn();
    const currentPositionStatus = this.gameStatus[positionX][positionY];

    // update gameStatus if location is not occupied
    if (currentPositionStatus === '.'){
      this.gameStatus[positionX][positionY] = xOrO;
      this.updateBoard()
      this.lastTurn = xOrO;
      this.numOfMoves += 1;
    } else {
      return `Oh no, a piece is already at ${location}! Try again...`;
    }
  }
  // if(this.numOfMoves === 9){
  //   return `Draw game`;
  // }

  // playGame(){
  //
  //   while (this.isGameWon = true) {
  //     this.updateGameStatus();
  //
  //
  //   }



  // }


};


// https://glebbahmutov.com/blog/unit-testing-cli-programs/

//[ [1, 2, 3], [4, 5, 6] ].flat()
//.join(" ")

// isPlayValid(){
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
