const expect = require('chai').expect;
const Tic = require('../lib/tic.js');
const readline = require('readline');

let ticTacToe;

describe('ticTacToe', function(){

  describe('currentBoard()', function(){
    beforeEach(function(){
      ticTacToe = new Tic({
        lastTurn: "O"
      });
    });

    it('should start with an empty board', function(){

      //arrange

      //act
      const startBoard = ticTacToe.currentBoard();

      //assert
      const expected = `. . .
. . .
. . .`
      expect(startBoard).to.equal(expected)

    });

  }); // currentBoard();


  describe('prompt()', function(){
    beforeEach(function(){
      ticTacToe = new Tic({
        lastTurn: "O"
      });
    });
    it('should return the location 5,5', function(){

      //arrange

      //act
      const response = ticTacToe.prompt("5,5");

      //assert
      expect(response).to.equal("5,5");

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
      expect(response).to.equal("O");

    });
  }); // currentTurn()




});
