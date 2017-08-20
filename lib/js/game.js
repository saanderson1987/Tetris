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
    this.makePieces();
    this.startGame();
    this.score = 0;
    this.updateScore(0);
  }

  makePieces() {
    this.pieces = [];

    for (let i = 0; i < 2; i++) {
      this.pieces.push(this.generatePiece());
    }

  }

  updateScore(factor) {
    this.score += 100 * factor;
    $( "#score" ).html(`${this.score}`);
  }

  startGame() {
    this.setCurrentPiece();
    this.loadKeyFunctions();
    this.displayNextPiece();
    this.dropPiece();
  }

  displayNextPiece() {
    $( `#nextPieceGrid li`).css("background-color", "transparent");
    let nextPiece = this.pieces[0];
    let nextPieceDisplayed = [];

    nextPiece.piecePos.forEach ( (piecePo) => {
      nextPieceDisplayed.push( [(piecePo[0] + 5), (piecePo[1] - 3)] );
    });

    nextPieceDisplayed.forEach( (piecePo) => {
      $( `#nextPieceGrid li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", nextPiece.color());
    });
  }

  setCurrentPiece() {
    this.currentPiece = this.pieces.shift();
    this.pieces.push(this.generatePiece());
  }

  dropPiece(time = 150) {
    let currentPiece = this.currentPiece;
    this.dropInterval = setInterval(() => {
      currentPiece.moveDownOne();
      this.checkStop();
    }, time);
  }

  checkStop(currentPiece = this.currentPiece) {
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
    this.checkCompletesRow();
    clearInterval(this.dropInterval);
    this.resetKeyFunctions();
    $('#game-over').show();
    let restartGame = this.restartGame.bind(this);
    $(document).one("keydown", function(e) {
      if (e.which === 32) {
        restartGame();

      }
    });

  }

  restartGame() {
    $('#game-over').hide();
    for(let i = 0; i < 20; i++) {
      this.grid.clearRow(i);
    }
    this.score = 0;
    this.updateScore(0);
    this.startGame();
  }

  generatePiece() {
    let pieces = [IPiece, OPiece, JPiece, LPiece, SPiece, TPiece, ZPiece];
    let pieceNum = Math.floor(Math.random() * 6);
    let newPiece = new pieces[pieceNum](this.grid);

    if (
      newPiece.piecePos.every( (piecePo) => {
        return $(`#mainGrid li[pos='${piecePo}']`).attr("static") !== true;
      })
    ) {
      return newPiece;
    }
  }

  loadKeyFunctions() {
    let currentPiece = this.currentPiece;
    let checkStop = this.checkStop.bind(this);
    let pause = this.pause.bind(this);
    let changeSpeed = this.changeSpeed.bind(this);
    let downArrowDown = false;
    $(document).on("keydown", function(e) {

      if (downArrowDown === true) {
        return;
      }

      switch (e.which) {
      case 32:
        pause();
        break;
      case 37:
        currentPiece.moveLeft();
        break;
      case 38:
        currentPiece.rotate();
        break;
      case 39:
        currentPiece.moveRight();
        break;
      case 40:
        downArrowDown = true;
        changeSpeed(75);
        break;
      }
      checkStop(currentPiece);
    });

    $(document).on("keyup", function(e) {
      if (e.which === 40) {
        downArrowDown = false;
        changeSpeed(150);
      }
    });

  }

  resetKeyFunctions() {
    $(document).off("keydown");
  }

  pause() {
    clearInterval(this.dropInterval);
    this.resetKeyFunctions();
    let unpause = this.unpause.bind(this);
    $(`#paused`).toggle();
    $(document).on("keydown", function(e) {
      switch (e.which) {
      case 32:
        unpause();
        break;
      }
    });

  }

  unpause() {
    this.resetKeyFunctions();
    this.loadKeyFunctions();
    $(`#paused`).toggle();
    this.dropPiece();
  }

  changeSpeed(speed) {
    clearInterval(this.dropInterval);
    this.dropPiece(speed);
  }

}


module.exports = Game;
