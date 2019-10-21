const readline = require('readline-sync');

module.exports = class Tic {
  constructor(config){
    this.currentTurn = config.currentTurn;
    this.gameStatus = [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ];
    this.numOfMoves = 0;
    this.quitGame = false;
    this.gameWon = false;
  }// constructor

  updateBoard(){
    const currentBoard = this.gameStatus;

    let printBoard = "";
    currentBoard.forEach( x => {
      printBoard += x.join(" ") + "\n";
    });

    return printBoard;
  }

  prompt(testLocation=null){
    //use arguement for testing only
    if(testLocation){
      return testLocation;
    }

    const player = (this.numOfMoves%2 === 0) ? "1" : "2";

    const inputLocation = readline.question(`Player ${player} enter a coord x,y to place your ${this.currentTurn} or enter 'q' to give up: `);

    return inputLocation;
  }

  nextTurn(){
    return (this.currentTurn === "X")? "O" : "X";
  }

  updateGameStatus(testLocation){
    const location = this.prompt(testLocation);

    if(location === "q"){
      this.quitGame = true;
      return "\nGoodbye. Thanks for playing.";
    }

    //if location is any format other than "num,num" return not valid
    const validLocation = location.match( /(\d+)\,(\d+)/ );
    const errorMsg = `\n${location} is not a valid coord. Try again... \n`;

    if(!validLocation){
      return errorMsg;
    }

    //adjust position x/y with minus to use index 0
    const positionX = parseInt(validLocation[1])-1;
    const positionY = parseInt(validLocation[2])-1;

    //Error if coordinates are greater than size of board
    if(positionX > 2 || positionX < 0 || positionY > 2 || positionY < 0){
      return errorMsg;
    }
    const currentPositionStatus = this.gameStatus[positionX][positionY];

    // update gameStatus if position is not occupied
    if (currentPositionStatus === '.'){

      const playerSymbol = this.currentTurn;
      this.gameStatus[positionX][positionY] = playerSymbol;
      this.numOfMoves += 1;

      const minMovesToWin = 5;
      if(this.numOfMoves >= minMovesToWin && this.checkForWin(playerSymbol)){
        return `\nMove accepted, well done you've won the game!\n\n${this.updateBoard()}`;
      }
      if(this.numOfMoves === 9 && !this.gameWon){
        return `\nMove accepted, draw game!\n\n${this.updateBoard()}`;
      }
      //update symbol ( X or O) for turn
      this.currentTurn = this.nextTurn()
      return `\nMove accepted, here's the current board: \n\n${this.updateBoard()}`;

    } else {
      return `\nOh no, a piece is already at ${location}! Try again...\n`;
    }
  }

  playGame(){
    console.log("Welcome to Tic Tac Toe! \n\nHere's the current board:\n");
    console.log(this.updateBoard());

    const maxNumOfMoves = 9;
    while (!this.quitGame && !this.gameWon && this.numOfMoves < maxNumOfMoves) {
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


    const gameStatus = [...this.gameStatus].flat();

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
