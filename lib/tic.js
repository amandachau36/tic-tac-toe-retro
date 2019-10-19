// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

const readline = require('readline-sync')

module.exports = class Tic {
  constructor(config){
    this.lastTurn = config.lastTurn;
//
    this.gameStatus = [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ];


  }// constructor

  updateBoard(){
    const currentBoard = this.gameStatus;

    let printBoard = "";
    currentBoard.forEach( x => {
      printBoard += x.join(" ") + "\n";
    })

    console.log(printBoard);
    return printBoard;
  }



  prompt(testLocation){
    if(testLocation) return testLocation ;

    const inputLocation = readline.question("Player 1 enter a coord x,y to place your X or enter 'q' to give up: ");

    console.log({inputLocation});
    return inputLocation;
  }

  currentTurn(){
    // console.log("-----", this.lastTurn);
    return (this.lastTurn === "X")? "O" : "X"
  }


  updateGameStatus(testLocation){

    const location = this.prompt(testLocation);

    // if location is any format other than "1,1" return error

    const validLocation = location.match( /\d\,\d/ );



    const translateLocation = location.match( /(\d)/g );

    //adjust location using index 0
    const positionX = parseInt(translateLocation[0])-1;
    const positionY = parseInt(translateLocation[1])-1;


    if(!validLocation || positionX > 2 || positionY > 2){
      return `${location} is not a valid coord. Try again...`;
    }


    const xOrO = this.currentTurn();
    const currentPositionStatus = this.gameStatus[positionX][positionY];

    // update GameStatus if game is emp
    if (currentPositionStatus === '.'){
      this.gameStatus[positionX][positionY] = xOrO;
      console.log(this.gameStatus);
    } else {
      return `Oh no, a piece is already at ${location}! Try again...`
    }


    //update lastTurn;
    this.lastTurn = xOrO;

    // must be two numbers between 1-3


  }








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
