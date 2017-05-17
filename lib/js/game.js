// const Grid = require('./grid');
const IPiece = require('./ipiece');
const OPiece = require('./opiece');
const JPiece = require('./jpiece');
const LPiece = require('./lpiece');
const SPiece = require('./spiece');
const TPiece = require('./tpiece');
const ZPiece = require('./zpiece');

class Game {

  constructor(grid) {
    this.grid = grid;
    // this.grid = new Grid;
    this.startGame();
    this.score = 0;
    this.updateScore(0);
  }

  updateScore(factor) {
    this.score += 100 * factor;
    $( "#score" ).html(`${this.score}`);
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
      this.checkStop();

      // if (currentPiece.checkStop()==="make static") {
      //   currentPiece.makeStatic();
      //   this.checkCompletesRow();
      //   clearInterval(this.dropInterval);
      //   this.resetKeyFunctions();
      //   this.startGame();
      // }
      // else if (currentPiece.checkStop()==="game over") {
      //   console.log('GAME OVER');
      //   this.checkCompletesRow();
      //   clearInterval(this.dropInterval);
      // }
    }, 150);
  }

  checkStop(currentPiece = this.currentPiece) {
    // let currentPiece = this.currentPiece
    if (currentPiece.checkStop()==="make static") {
      currentPiece.makeStatic();
      this.checkCompletesRow();
      clearInterval(this.dropInterval);
      this.resetKeyFunctions();
      this.startGame();
    }
    else if (currentPiece.checkStop()==="game over") {
      this.gameOver();
    }
  }

  checkCompletesRow() {
    if (this.currentPiece.completedRows().length > 0) {
      this.updateScore(this.currentPiece.completedRows().length);
      this.grid.clearRows(this.currentPiece.completedRows());
    }
  }

  gameOver () {
    console.log('GAME OVER');
    this.checkCompletesRow();
    clearInterval(this.dropInterval);
    this.resetKeyFunctions();
    $('.game-over').show();
    let restartGame = this.restartGame.bind(this);
    $(document).one("keydown", function(e) {
      if (e.which === 32) {
        restartGame();

      }
    });

  }

  restartGame() {
    $('.game-over').hide();
    for(let i = 0; i < 20; i++) {
      this.grid.clearRow(i);
    }
    this.score = 0;
    this.updateScore(0);
    this.startGame();
  }

  generatePiece() {
    // return new IPiece(this.grid);
    let pieces = [IPiece, OPiece, JPiece, LPiece, SPiece, TPiece, ZPiece];
    let pieceNum = Math.floor(Math.random() * 6);
    let newPiece = new pieces[pieceNum](this.grid);

    if (
      newPiece.piecePos.every( (piecePo) => {
        return $(`li[pos='${piecePo}']`).attr("static") !== true;
      })
    ) {
      return newPiece;
    }
  }

  loadKeyFunctions() {
    let currentPiece = this.currentPiece;
    let checkStop = this.checkStop.bind(this);
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
      checkStop(currentPiece);
    });

  }

  resetKeyFunctions() {
    $(document).off("keydown");
  }


}


module.exports = Game;
