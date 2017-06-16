# Tetris

[Play here](https://saanderson1987.github.io/Tetris/)

My take on the classic 80's arcade game.

## How to Play

The goal is to gain points by filling all the squares of a row with pieces.
Pieces of different shapes fall from the top of the grid and stop once one of the piece's square either hits the bottom or hits another piece.
Move a piece as it falls by using the left and right arrows.
Rotate a piece by pressing the up arrow.
Press space bar to begin.


## Technical Implementation

I used HTML, CSS, JavaScript, and JQuery. To create the grid, I made a series of `<ul>` elements to represent the rows, and `<li>` elements for the squares. Using CSS, I styled the `<li>`s to lie next to each other and added a square border around them. Each square is given a 'pos' attribute that marks it vertical and horizontal position on the grid.

Pieces are created by giving a background color to the `<li>` squares and a custom attribute 'static' that is marked true if the piece is not moving. Pieces are dropped using JavaScript's setInterval function: at every interval, the piece's position moves down one by removing the background color of the previous position and coloring the new position.
