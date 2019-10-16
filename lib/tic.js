// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

const readline = require('readline-sync')

module.exports = class Tic {
  constructor(config){
    this.lastTurn = config.lastTurn;
  }


  currentBoard(){
    let board = `. . .
. . .
. . .`
    console.log(board);
    return board;
  }

  prompt(testLocation){
    if(testLocation) return "5,5";

    const inputLocation = readline.question("Player 1 enter a coord x,y to place your X or enter 'q' to give up: ");

    console.log({inputLocation});
    return inputLocation;
  }

  // isInputLocationValid(){
  //   // must be two numbers between 1-3
  //   // must not be already filled
  // }

  currentTurn(){
    // console.log("-----", this.lastTurn);
    return (this.lastTurn === "X")? "O" : "X"
  }




};


// https://glebbahmutov.com/blog/unit-testing-cli-programs/
