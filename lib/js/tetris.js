const Game = require ("./game");
const Grid = require('./grid');


let grid = new Grid;
$(document).one("keydown", function(e) {
  if (e.which === 32) {
    $('#directions').toggle();
    new Game(grid);

  }
});
