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

  checkForWin(player){
    const x = 3;
    const gameStatus = this.gameStatus;


    //check rows for win
    gameStatus.forEach( row => {
      let checkRow = row.every(x => x === player);
      if(checkRow) this.gameWon = true;

    })


    // true or false
    return this.gameWon


    // let diagonal1 = [];
    // for ( let j = 0; j < this.boxNumber.length; j+=(x+1) ) {
    //   diagonal1.push(this.boxNumber[j]);
    // };
    //
    // if( this.isMatch(diagonal1, player) ){
    //   return true;
    // };   // end of diagonal1
    //
    //
    // let diagonal2 = [];
    //
    // for ( let j = (x-1); j < this.boxNumber.length-1; j+=(x-1) ) {
    //   diagonal2.push(this.boxNumber[j]);
    // };
    //
    // if( this.isMatch(diagonal2, player) ){
    //   return true;
    // }; // end of diagonal2

    //
    // let cols = [];
    //
    // for(let j = 0; j < x; j++){
    // // creates an array within cols (i.e. cols will be an array of arrays)
    //   cols[j] = [];
    //   for ( let i = j; i < this.boxNumber.length; i+=x ) {
    //     cols[j].push(this.boxNumber[i]);
    //   }
    // };
    //
    // for (let i = 0; i < cols.length; i++) {
    //   if( this.isMatch(cols[i], player) ){
    //     return true;
    //   }
    // }; // end of columns


    // let rows = [];
    //
    //
    // for(let j = 0, k = 0; j < this.boxNumber.length; j+=x, k++){
    //   //k is only the number for arrays, this removes empty arrays problem when using row[j]
    //   rows[k] = [];
    //   for ( let i = j; i < (j+x); i++ ) {
    //     rows[k].push(this.boxNumber[i]);
    //   }
    // };
    //
    // for(let i = 0; i < rows.length; i++){
    //   if( this.isMatch(rows[i], player) ){
    //     return true;
    //   }
    // }; // end of rows

    // [12, 5, 8, 130, 44].every(x => x >= 10); // false
    // [12, 54, 18, 130, 44].every(x => x >= 10); // true​
    // return true;
  }

  // play again if winner/draw is delared



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
