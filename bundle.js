/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Piece {

  constructor(grid) {
    this.grid = grid;
    this.pieceLayout = this.setLayout();
    this.setPos();

  }

  setLayout() {
    return ;
  }



  colorPos() {
    this.piecePos.forEach( (piecePo) => {

      $( `#mainGrid li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
    });
  }

  moveDownOne() {
    this.piecePos.forEach( (piecePo, idx) => {

      $( `#mainGrid li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "transparent");
      piecePo[0] += 1;
      $( `#mainGrid li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
      this.colorPos();
    });

  }

  rotate() {

    let newPieceLayout = (this.pieceLayout + 1) % this.rotationKeys.length;



    if (this.validMove(newPieceLayout)) {
      this.piecePos.forEach( (piecePo, idx) => {
        $( `#mainGrid li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "transparent");
        piecePo[0] += this.rotationKeys[newPieceLayout][idx][0] - this.rotationKeys[this.pieceLayout][idx][0];
        piecePo[1] += this.rotationKeys[newPieceLayout][idx][1] - this.rotationKeys[this.pieceLayout][idx][1];
      });



      this.pieceLayout = newPieceLayout;
      this.colorPos();
    }


  }

  validMove(newPieceLayout) {


    return this.piecePos.every( (piecePo, idx) => {
      let newPiecePo = [ ( piecePo[0] + (this.rotationKeys[newPieceLayout][idx][0] - this.rotationKeys[this.pieceLayout][idx][0]) ),
        ( piecePo[1] + (this.rotationKeys[newPieceLayout][idx][1] - this.rotationKeys[this.pieceLayout][idx][1]) ) ] ;
      return !($( `#mainGrid li[pos='${newPiecePo}']` ).attr("static") === "true") && newPiecePo[1] >= 0 && newPiecePo[1] <= 9;

    });
  }




  checkStop() {
    let gameOver = true;
    for (let i = 0; i < this.piecePos.length; i++) {
      let piecePo = this.piecePos[i];
      if (piecePo[0] === -1
        && $( `#mainGrid li[pos='${piecePo[0]+1},${piecePo[1]}']` ).attr("static") === "true"
      ){
        console.log('game over man');
        return "game over";
      }
      else if (piecePo[0] === 19
        || $( `#mainGrid li[pos='${piecePo[0]+1},${piecePo[1]}']` ).attr("static") === "true"
      ){
        return "make static";
      }
    }

  }

  makeStatic() {
    this.piecePos.forEach( (piecePo) => {
      $( `#mainGrid li[pos='${piecePo[0]},${piecePo[1]}']` ).attr("static", "true");
    });
  }

  completedRows() {
    const grid = this.grid;
    let completedRows = [];

    this.piecePos.forEach ( (piecePo) => {
      $(`ul[row=${piecePo[0]}]`).each( function () {
        let rowComplete = true;
        $( this ).children().each( function() {
          if ($( this ).attr("static") !== "true" ) {
            rowComplete = false;
          }
        });
        if (rowComplete) {
          completedRows.push(piecePo[0]);
        }
      });
    });

    let rowsToClear = completedRows.filter( (row, index) => {
      return completedRows.indexOf(row) === index;
    });

    return rowsToClear.sort( (a,b) => {
      return a - b;
    });
  }

  moveLeft() {
    // barriers:
    let leftPiece = this.piecePos[0];
    if (
      this.piecePos[0][1] === 0
      || $( `#mainGrid li[pos='${leftPiece[0]},${leftPiece[1]-1}']` ).attr("static") === "true"
    ){
      return;
    }

    this.piecePos.forEach( (piecePo) => {
      $( `#mainGrid li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "transparent");
      piecePo[1] -= 1;
      $( `#mainGrid li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
    });

    this.colorPos();
  }

  moveRight() {
    let rightPiece = this.piecePos[this.piecePos.length - 1];
    if (
      rightPiece[1] === 9
      || $( `#mainGrid li[pos='${rightPiece[0]},${rightPiece[1]+1}']` ).attr("static") === "true"
    ) {
      return;
    }

    this.piecePos.forEach( (piecePo) => {
      $( `#mainGrid li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "transparent");
      piecePo[1] += 1;
      $( `#mainGrid li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
    });

    this.colorPos();
  }
}

module.exports = Piece;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const IPiece = __webpack_require__(3);
const OPiece = __webpack_require__(6);
const JPiece = __webpack_require__(4);
const LPiece = __webpack_require__(5);
const SPiece = __webpack_require__(7);
const TPiece = __webpack_require__(9);
const ZPiece = __webpack_require__(10);

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

  dropPiece() {
    console.log(this.pieces);
    let currentPiece = this.currentPiece;
    this.dropInterval = setInterval(() => {
      currentPiece.moveDownOne();
      this.checkStop();
    }, 150);
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
    console.log('GAME OVER');
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
    $(document).on("keydown", function(e) {
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
      }
      checkStop(currentPiece);
    });

  }

  resetKeyFunctions() {
    $(document).off("keydown");
  }

  pause() {
    debugger;
    clearInterval(this.dropInterval);
    this.resetKeyFunctions();
    let unpause = this.unpause.bind(this);
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
    this.dropPiece();
  }

}


module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Grid {

  constructor(grid, height, width) {
    this.grid = grid;
    this.height = height;
    this.width = width;
    this.setDimensions();
    this.create();
  }

  setDimensions() {
    this.grid.width(this.width*25);
  }

  create() {
    for(let rowIdx = 0; rowIdx< this.height; rowIdx++) {
      this.grid.append(this.addRow(rowIdx));
    }
  }

  addRow(rowIdx) {
    const $row = $("<ul>").addClass("row").attr("row", rowIdx);
    for(let colIdx= 0; colIdx < this.width; colIdx++) {
      const $square = $("<li>").addClass("square").attr("pos", [rowIdx, colIdx] );
      $row.append($square);
    }
    return $row;
  }

  clearRows(rows) {

    rows.forEach( (row) => {
      this.clearRow(row);
    });
  }

  clearRow(row) {
    $(`ul[row=${row}]`).each( function () {
      $( this ).remove();
    });

    this.grid.prepend(this.addRow(1));

    $('ul').each( function (rowIdx) {
      $( this ).attr('row', rowIdx);
      $( this ).children().each( function(colIdx) {
        $( this ).attr('pos', [rowIdx, colIdx]);
      });
    });

  }


}

module.exports = Grid;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class IPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "green";
  }

  setLayout() {
    return Math.floor(Math.random() * 2);
  }

  setPos() {

    this.rotationKeys = [
      [ [-3, 3], [-3, 4], [-3,5], [-3,6] ],
      [ [-5, 4], [-4, 4], [-3, 4], [-2, 4] ],
      [ [-4, 3], [-4, 4], [-4,5], [-4,6] ],
      [ [-5, 5], [-4, 5], [-3, 5], [-2, 5] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }



}

module.exports = IPiece;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class JPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "red";
  }

  setLayout() {
    return Math.floor(Math.random() * 4);
  }

  setPos() {
    this.rotationKeys = [
      [ [-3,3], [-3,4], [-3,5], [-2,5] ],
      [ [-2,3], [-4,4], [-3,4], [-2,4]  ],
      [ [-4,3], [-3,3], [-3,4], [-3,5] ],
      [ [-4,4], [-3,4], [-2,4], [-4,5] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }






}

module.exports = JPiece;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class LPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "yellow";
  }

  setLayout() {
    return Math.floor(Math.random() * 4);

  }

  setPos() {

    this.rotationKeys = [
      [ [-2,3], [-3,3], [-3,4], [-3,5] ],
      [ [-4,3], [-4,4], [-3,4], [-2,4] ],
      [ [-3,3], [-3, 4], [-3, 5], [-4, 5] ],
      [ [-4,4], [-3,4], [-2, 4], [-2, 5] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = LPiece;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class OPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "blue";
  }

  setPos() {
    this.piecePos = [ [-2, 4], [-3, 4], [-2, 5], [-3, 5] ];
    this.colorPos();
  }

  rotate() {
    return;
  }

}

module.exports = OPiece;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class SPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "orange";
  }

  setLayout() {
    return Math.floor(Math.random() * 2);

  }

  setPos() {

    this.rotationKeys = [
      [ [-3,3], [-3,4], [-4,4], [-4,5] ],
      [ [-3,4], [-4,4], [-2,5], [-3,5] ],
      [ [-2,3], [-2,4], [-3,4], [-3,5] ],
      [ [-4,3], [-3,3], [-3,4], [-2,4] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = SPiece;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__ (1);
const Grid = __webpack_require__(2);


let mainGrid = new Grid($("#mainGrid"), 20, 10);
let nextPieceGrid = new Grid($("#nextPieceGrid"), 4, 4);
$(document).one("keydown", function(e) {
  if (e.which === 32) {
    $('#directions').toggle();
    new Game(mainGrid);

  }
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class TPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "purple";
  }

  setLayout() {
    return Math.floor(Math.random() * 4);

  }

  setPos() {

    this.rotationKeys = [
      [ [-3, 3], [-4,4], [-3,4], [-3,5] ],
      [ [-3,4], [-4,4], [-2,4], [-3,5] ],
      [ [-3,3], [-3,4], [-2,4], [-3,5] ],
      [ [-3,3], [-4,4], [-2,4], [-3, 4]]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = TPiece;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const Piece = __webpack_require__(0);

class ZPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "cyan";
  }

  setLayout() {
    return Math.floor(Math.random() * 2);

  }

  setPos() {

    this.rotationKeys = [
      [ [-4,3], [-4,4], [-3,4], [-3,5] ],
      [ [-3,4], [-4,5], [-2,4], [-3,5] ],
      [ [-3,3], [-3,4], [-2,4], [-2,5]],
      [ [-3,3], [-4,4], [-2,3], [-3,4]]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = ZPiece;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map