const expect = require('chai').expect;
const Tic = require('../lib/tic.js');

let ticTacToe;

describe('ticTacToe', function(){

  describe('currentBoard()', function(){
    beforeEach(function(){
      ticTacToe = new Tic();
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
  });



});
