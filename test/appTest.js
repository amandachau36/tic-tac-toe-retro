const expect = require('chai').expect;
const Tic = require('../lib/tic.js');
const readline = require('readline');

let ticTacToe;

describe('ticTacToe', function(){

  describe('printBoard()', function(){
    beforeEach(function(){
      ticTacToe = new Tic({
        lastTurn: "O"
      });
    });

    it('should start with an empty board', function(){
      //arrange

      //act
      const startBoard = ticTacToe.updateBoard();

      //assert
      const expected = `. . .
. . .
. . .
`
      expect(startBoard).to.equal(expected)
    });
  }); // printBoard();


  describe('prompt()', function(){
    beforeEach(function(){
      ticTacToe = new Tic({
        lastTurn: "O"
      });
    });
    it('should return the location 1,1', function(){
      //arrange

      //act
      const response = ticTacToe.prompt("1,1");

      //assert
      expect(response).to.equal("1,1");
    });
  }); // prompt()

  describe('currentTurn()', function(){
    beforeEach(function(){
      ticTacToe = new Tic({
        lastTurn: "O"
      });
    });
    it('should return "X" for the first turn', function(){
      //arrange

      //act
      const response = ticTacToe.currentTurn();

      //assert
      expect(response).to.equal("X");
    });
  }); // currentTurn()


  describe('updateGameStatus()', function(){
    beforeEach(function(){
      ticTacToe = new Tic({
        lastTurn: "O"
      });
    });
    it('should place an X in the top left hand corner', function(){
      //arrange
      const inputLocation = "1,1"

      //act
      ticTacToe.updateGameStatus(inputLocation);
      const response = ticTacToe.gameStatus[0][0];

      //assert
      expect(response).to.equal("X");

    });
    it('should inform player that "11" is not a valid coord', function(){
      //arrange
      const inputLocation = "11"

      //act
      const response = ticTacToe.updateGameStatus(inputLocation);

      //assert
      expect(response).to.equal(`\n${inputLocation} is not a valid coord. Try again... \n`);

    });

    it('should inform player that "1,4" is not a valid coord', function(){
      //arrange
      const inputLocation = "1,4"

      //act
      const response = ticTacToe.updateGameStatus(inputLocation);

      //assert
      expect(response).to.equal(`\n${inputLocation} is not a valid coord. Try again... \n`);

    });

    it('should inform player that "1,3" is not a valid coord when it is already occupied', function(){
      //arrange
      const inputLocation = "1,3"
      ticTacToe.gameStatus = [
        [".", ".", "X"],
        [".", ".", "."],
        [".", ".", "."]
      ];

      //act
      const response = ticTacToe.updateGameStatus(inputLocation);

      //assert
      expect(response).to.equal(`\nOh no, a piece is already at ${inputLocation}! Try again...\n`);
    });

    it('should add 1 move to numOfMoves for every valid turn', function(){
      //arrange
      const inputLocation = "2,1"

      //act
      ticTacToe.updateGameStatus(inputLocation);

      //assert
      expect(ticTacToe.numOfMoves).to.equal(1);
    });

    it('should quit game if "q" is entered', function(){
      //arrange
      const input = "q"

      //act
      const response = ticTacToe.updateGameStatus(input);

      //assert
      expect(response).to.equal("\nGoodbye. Thanks for playing.");
    });

  }); // updateGameStatus()
  // describe('playGame()', function(){
  //   beforeEach(function(){
  //     ticTacToe = new Tic({
  //       lastTurn: "O"
  //     });
  //   });
  // }); // playGame()

  // describe('isPlayValid', function(){
  //   beforeEach(function(){
  //     ticTacToe = new Tic({
  //       lastTurn: "X"
  //     });
  //   });
  //   it('should return true when user selects a space that is not currently occupied', function(){
  //
  //     //arrange
  //     const inputLocation = "1,1"
  //
  //     //act
  //     const response = ticTacToe.isPlayValid(inputLocation);
  //
  //     //assert
  //     expect(response).to.equal(true);
  //
  //   });
  // }); // isPlayValid()


});
