const Game = require ("./game");
const Grid = require('./grid');


const grid = new Grid;
$(document).one("keydown", function(e) {
  if (e.which === 32) {
    new Game(grid);
  }
});
