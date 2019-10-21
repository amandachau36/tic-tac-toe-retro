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
* The game is drawn when all fields are taken on the board AND there are no wins.

## Assumptions
* Input coord must be in `num,num` format. Player will receive an error message for input such as `1,4`, `cat`, `1000000` or `0,3`. However `-1,2` and `1,2,3` is interpreted as `1,2`. Therefore, I assume that users will enter positive numbers only and only 2 numbers separated by one comma.
* I assumed that scaling the board to n x n (e.g. 4x4 or 5x5 etc) is not important.
* I assumed that when there is a winner, draw, or someone gives up that the game exits. Therefore, I did not keep score or ask if the players would like to play again.
* I assumed that if a piece (X or O) is at particular position that another piece cannot replace it.  


## Disclaimer
Although I have limited experience with testing, I attempted to implement TDD using Mocha and Chai and I'm keen to learn more! Test only code inside of tic.js i.e `prompt(testLocation=null)` is not ideal.


## Tech Used
* JavaScript
* mocha 6.2.1 and chai 4.2.0
* readline-sync 1.4.10

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

## Sample game
```
Here's the current board:

. . .
. . .
. . .

Player 1 enter a coord x,y to place your X or enter 'q' to give up: 1,1

Move accepted, here's the current board:

X . .
. . .
. . .

Player 2 enter a coord x,y to place your O or enter 'q' to give up: 1,3

Move accepted, here's the current board:

X . O
. . .
. . .

Player 1 enter a coord x,y to place your X or enter 'q' to give up: 2,2

Move accepted, here's the current board:

X . O
. X .
. . .

Player 2 enter a coord x,y to place your O or enter 'q' to give up: 4,1

4,1 is not a valid coord. Try again...

Player 2 enter a coord x,y to place your O or enter 'q' to give up: 1,3

Oh no, a piece is already at 1,3! Try again...

Player 2 enter a coord x,y to place your O or enter 'q' to give up: 3,1

Move accepted, here's the current board:

X . O
. X .
O . .

Player 1 enter a coord x,y to place your X or enter 'q' to give up: 3,3

Move accepted, well done you've won the game!

X . O
. X .
O . X
```
