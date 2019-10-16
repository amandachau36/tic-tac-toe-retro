// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

const readline = require('readline-sync')

module.exports = class Tic {


  currentBoard(){
    let board = `. . .
. . .
. . .`
    console.log(board);
    return board;
  }

  prompt(location){
    if(location) return "5,5";

    location = readline.question("Player 1 enter a coord x,y to place your X or enter 'q' to give up: ");

    console.log(location)
    return location;
  }

  




};


// https://glebbahmutov.com/blog/unit-testing-cli-programs/
