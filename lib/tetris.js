const Game = require ("./game");

$(document).one("keydown", function(e) {
  // debugger;

  if (e.which === 32) {
    new Game;
  }
});
