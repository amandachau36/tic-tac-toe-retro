# Yay, Tic Tac Toe!  

## Goal:
To implement a console based version of Tic Tac Toe that allows two human players to play the game on a 3 x 3 board.

## Constraints:
* Two players are required for a game.  
* Each player will assume either an “X” or “O”.  
* Players take turn to play till a player wins, or the end of the game (whichever happens first).  
* Player X always starts the game.  

### Conditions for win:
* A player wins when all fields in a column are taken by the player.
* A player wins when all fields in a row are taken by the player.
* A player wins when all fields in a diagonal are taken by the player.


### Condition for a draw:
* The game is drawn when all fields are taken on the board AND no wins.

## Assumptions
* Input coord must be in `num,num` format. Player will receive an error message for input such as `1,4`, `cat`, `1000000` or `0,3`. However `-1,2` and `1,2,3` is interpreted as `1,2`. Therefore, I assume that users will enter a positive numbers only and only 2 numbers separated by a comma
* I assumed that the board will only be 3 x 3 and scaling the board to n x n (e.g. 4x4 or 5x5 etc) is not important
* I assumed that when there is winner, a draw, or someone gives up that the game exits. Therefore, I did not keep score or ask if they would like to play again.
* I assumed that if a piece (X or O) is at particular position that another piece cannot replace it.  


## Disclaimer
Although I have limited experience with testing, I attempted to implement TDD using Mocha and Chai and I'm keen to learn more. Test only code inside of tic.js i.e `prompt(testLocation=null)` is not ideal.


## Tech Used
JavaScript
chai 4.2.0
mocha 6.2.1
readline-sync 1.4.10

## Getting Started

#### Prerequisites
Node.js and either npm or yarn

#### Installation
Install NPM packages after cloning repo
```
yarn install
```
or
```
npm install
```

#### Run Program
```
node app.js
```

#### Run Tests
```
yarn test
```
or
```
npm test
```
