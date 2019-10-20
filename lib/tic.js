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
      // TODO: don't hardcode 5 size of board x 2 - 1

      if(this.numOfMoves >= 5 && this.checkForWin(xOrO)){
        return "\nMove accepted, well done you've won the game!\n";
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
    console.log("Welcome to Tic Tac Toe! \n\nHere's the current board:\n")
    console.log(this.updateBoard());

    while (!this.quitGame && !this.gameWon) {
      console.log(this.updateGameStatus());
    }
  }

  isWinner(line, player){
    // let checkLine = ;
    if(line.every(x => x === player)){
      this.gameWon = true;
      return true; // stop checking
    }

  };

  checkForWin(player){
    const x = 3;

    //check rows for win
    let rows = [...this.gameStatus];

    rows.forEach( row => {
      this.isWinner(row, player);
    })

    //why is return not working
    // console.log("=======", this.gameWon);

    const gameStatus = [...this.gameStatus].flat()
    console.log(gameStatus);

    //check cols;
    let cols = [];

    for(let j = 0; j < x; j++){
    // creates an array within cols (i.e. cols will be an array of arrays)
      cols[j] = [];
      for ( let i = j; i < gameStatus.length; i+=x ) {
        cols[j].push(gameStatus[i]);
      }
    };

    cols.forEach( col => {
      this.isWinner(col, player);
    });


    //check diagonals
    let diagonal1 = [];
    for ( let j = 0; j < gameStatus.length; j+=(x+1) ) {
      diagonal1.push(gameStatus[j]);
    };
    this.isWinner(diagonal1, player);


    let diagonal2 = [];

    for ( let j = (x-1); j < gameStatus.length-1; j+=(x-1) ) {
      diagonal2.push(gameStatus[j]);
    };
    this.isWinner(diagonal2, player);

    return this.gameWon

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
