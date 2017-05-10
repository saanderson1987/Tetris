const Grid = require('./grid');
const IPiece = require('./ipiece');
const OPiece = require('./opiece');
const JPiece = require('./jpiece');
const LPiece = require('./lpiece');
const SPiece = require('./spiece');
const TPiece = require('./tpiece');
const ZPiece = require('./zpiece');

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
      // debugger;
      if (currentPiece.checkStop()==="make static") {
        console.log('at bottom');
        currentPiece.makeStatic();
        currentPiece.checkCompletesRow();
        clearInterval(this.dropInterval);
        this.resetKeyFunctions();
        this.startGame();
      }
      else if (currentPiece.checkStop()==="game over") {
        console.log('GAME OVER');
        currentPiece.checkCompletesRow();
        clearInterval(this.dropInterval);
      }
    }, 150);
  }



  generatePiece() {
    return new OPiece(this.grid);
    let pieces = [IPiece, OPiece, JPiece, LPiece, SPiece, TPiece, ZPiece];
    let pieceNum = Math.floor(Math.random() * 6);
    return new pieces[pieceNum](this.grid);
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
