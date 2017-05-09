const Grid = require('./grid');
const IPiece = require('./ipiece');
const OPiece = require('./opiece');
const JPiece = require('./jpiece');
const LPiece = require('./lpiece');

class Game {

  constructor() {
    this.grid = new Grid;
    this.startGame();
  }

  startGame() {
    this.currentPiece = this.generatePiece();
    this.loadKeyFunctions();
    this.dropPiece();

  }

  dropPiece() {
    let currentPiece = this.currentPiece;
    this.dropInterval = setInterval(() => {
      currentPiece.moveDownOne();
      if (currentPiece.atStop()) {
        console.log('at bottom');
        // debugger;
        currentPiece.makeStatic();
        currentPiece.checkCompletesRow();
        clearInterval(this.dropInterval);
        this.resetKeyFunctions();
        this.startGame();
      }
    }, 150);
  }



  generatePiece() {
    return new LPiece(this.grid);
    // let max = 3;
    // let min = 1;
    // let pieceNum = Math.floor(Math.random() * (max - min + 1)) + min;
    // switch (pieceNum) {
    //   case 1:
    //     return new IPiece(this.grid);
    //   case 2:
    //     return new OPiece(this.grid);
    //   case 3:
    //     return new JPiece(this.grid);
    // }
  }

  loadKeyFunctions() {
    let currentPiece = this.currentPiece;
    $(document).on("keydown", function(e) {
      // e.preventDefault();
      switch (e.which) {
      case 37:
        currentPiece.moveLeft();
        break;
      case 38:
        currentPiece.rotate();
        break;
      case 39:
        currentPiece.moveRight();
        break;
      }
    });
  }

  resetKeyFunctions() {
    $(document).off("keydown");
  }


}


module.exports = Game;
