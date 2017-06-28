const Game = require ("./game");
const Grid = require('./grid');


let mainGrid = new Grid($("#mainGrid"), 20, 10);
let nextPieceGrid = new Grid($("#nextPieceGrid"), 4, 4);
$(document).one("keydown", function(e) {
  if (e.which === 32) {
    $('#directions').toggle();
    new Game(mainGrid);

  }
});
