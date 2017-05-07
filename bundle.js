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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
    return Math.random() < 0.5 ? "horizontal" : "vertical";
  }

  setPos() {
    this.piecePos = [];
    this.colorPos();
  }

  colorPos() {
    this.piecePos.forEach( (piecePo) => {
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
    });
  }

  atStop() {
    return this.piecePos.some( (piecePo) => {
      if (piecePo[0] === 19
        || $( `li[pos='${piecePo[0]+1},${piecePo[1]}']` ).attr("static") === "true"
      ){
        // clearInterval(this.dropInterval);
        // this.makeStatic();
        //
        // this.checkCompletesRow();
        // this.setPos();
        // this.dropPiece();
        return true;
      }
    });
  }



  makeStatic() {
    this.piecePos.forEach( (piecePo) => {
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).attr("static", "true");
    });
  }

  checkCompletesRow() {
    // const clearRow = this.clearRow;
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
          grid.clearRow(piecePo[0]);
          completedRows.push(piecePo[0]);
        }
      });
    });

    let rowsToClear = completedRows.filter( (row, index) => {
      return completedRows.indexOf(row) === index;
    });

  }

  moveLeft() {
    // barriers:
    let leftPiece = this.piecePos[0];
    if (
      this.piecePos[0][1] === 0
      || $( `li[pos='${leftPiece[0]},${leftPiece[1]-1}']` ).attr("static") === "true"
    ){
      return;
    }

    this.piecePos.forEach( (piecePo) => {
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
      piecePo[1] -= 1;
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
    });
  }

  moveRight() {
    let rightPiece = this.piecePos[this.piecePos.length - 1];
    if (
      rightPiece[1] === 9
      || $( `li[pos='${rightPiece[0]},${rightPiece[1]+1}']` ).attr("static") === "true"
    ) {
      return;
    }

    this.piecePos.forEach( (piecePo) => {
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
      piecePo[1] += 1;
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
    });
  }

  // dropPiece() {
  //   this.dropInterval = setInterval(() => { this.moveDownOne(); }, 150);
  // }




}

module.exports = Piece;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Grid = __webpack_require__(2);
const IPiece = __webpack_require__(3);
const OPiece = __webpack_require__(5);
const JPiece = __webpack_require__(4);

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
    // return new IPiece(this.grid);
    let max = 3;
    let min = 1;
    let pieceNum = Math.floor(Math.random() * (max - min + 1)) + min;
    switch (pieceNum) {
      case 1:
        return new IPiece(this.grid);
      case 2:
        return new OPiece(this.grid);
      case 3:
        return new JPiece(this.grid);
    }
  }

  loadKeyFunctions() {
    let currentPiece = this.currentPiece;
    $(document).on("keydown", function(e) {
      e.preventDefault();
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

//
// const $grid = $("#grid");
//
// const addRow = (rowIdx) => {
//   const $row = $("<ul>").addClass("row").attr("row", rowIdx);
//   for(let colIdx= 0; colIdx < 10; colIdx++) {
//     const $square = $("<li>").addClass("square").attr("pos", [rowIdx, colIdx] );
//     $row.append($square);
//   }
//   return $row;
//   // $grid.append($row);
// };
//
//
// for(let rowIdx = 0; rowIdx< 20; rowIdx++) {
//   // addRow(rowIdx);
//   $grid.append(addRow(rowIdx));
// }

class Grid {

  constructor() {
    this.grid = $("#grid");
    this.create();
  }

  create() {
    for(let rowIdx = 0; rowIdx< 20; rowIdx++) {
      // addRow(rowIdx);
      this.grid.append(this.addRow(rowIdx));
    }
  }

  addRow(rowIdx) {
    const $row = $("<ul>").addClass("row").attr("row", rowIdx);
    for(let colIdx= 0; colIdx < 10; colIdx++) {
      const $square = $("<li>").addClass("square").attr("pos", [rowIdx, colIdx] );
      $row.append($square);
    }
    return $row;
    // $grid.append($row);
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

  setPos() {
    if (this.pieceLayout === 'horizontal') {
      this.piecePos = [ [0, 3], [0, 4], [0,5], [0,6] ];
    } else {
      this.piecePos = [ [0,4] ];
    }

    this.colorPos();
  }

  moveDownOne() {
    if (this.pieceLayout === 'horizontal') {
      this.piecePos.forEach( (piecePo) => {
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
        piecePo[0] += 1;
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
      });
    } else {
      if (this.piecePos.length < 4) {
        let oldTopPiece = this.piecePos[0];
        this.piecePos.unshift([ (oldTopPiece[0]), oldTopPiece[1] ]);
        this.piecePos.forEach( (piecePo, idx) => {
          if (idx === 0) {
            return;
          }
          piecePo[0] += 1;
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
        });
      } else {
        this.piecePos.forEach( (piecePo, idx) => {
          if (idx === 0) {
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
          }
          piecePo[0] += 1;
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());

        });
      }
    }
  }

  rotate() {
    if (this.pieceLayout === 'horizontal') {
      this.piecePos.forEach( (piecePo, idx) => {
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
        switch (idx) {
          case 0:
            piecePo[0] -= 2;
            piecePo[1] += 2;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
          case 1:
            piecePo[0] -= 1;
            piecePo[1] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
          case 2:
            break;
          case 3:
            piecePo[0] += 1;
            piecePo[1] -= 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
        }
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
      });
      this.pieceLayout = 'vertical';
    } else {
      this.piecePos.forEach( (piecePo, idx) => {
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
        switch (idx) {
          case 0:
            piecePo[0] += 2;
            piecePo[1] -= 2;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
          case 1:
            piecePo[0] += 1;
            piecePo[1] -= 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
          case 2:
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
          case 3:
            piecePo[0] -= 1;
            piecePo[1] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
        }
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
      });
      this.pieceLayout = 'horizontal';

    }
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

  setPos() {
    if (this.pieceLayout === 'horizontal') {
      this.piecePos = [ [0,5] ];
    } else {
      this.piecePos = [ [0,4], [0,5] ];
    }

    this.colorPos();
  }

  moveDownOne() {

    switch (this.pieceLayout) {
      case 'h1':
        if (this.piecePos.length < 4) {
          let firstPiece = JSON.parse(JSON.stringify(this.piecePos[0]));
          $( `li[pos='${firstPiece[0]},${firstPiece[1]}']` ).css("background-color", "white");
          this.piecePos.unshift(
            [0, firstPiece[1] - 2],
            [0, firstPiece[1] - 1],
            firstPiece
          );
          this.piecePos[3][0] += 1;
          this.colorPos();
        } else {
          this.piecePos.forEach( (piecePo, idx) => {
            if (idx < 3) {
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
            }
            piecePo[0] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
          });
        }
        break;
      case 'v1':
        if (this.piecePos.length < 4) {
          let secondPiece = JSON.parse(JSON.stringify(this.piecePos[this.piecePos.length-1]));
          this.piecePos.forEach( (piecePo, idx) => {
            if (idx === 0) {
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
            }
            piecePo[0] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
          });
          this.piecePos.push(
            [0, secondPiece[1]]
          );
        } else {
          this.piecePos.forEach( (piecePo, idx) => {
            if(idx === 0 || idx === this.piecePos.length - 1) {
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
            }
            piecePo[0] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
          });
        }
        break;
      case 'h2':
        if (this.piecePos.length < 4) {
          let firstPiece = JSON.parse(JSON.stringify(this.piecePos[0]));
          this.piecePos.unshift(firstPiece);
          for (let i = 1; i < this.piecePos.length; i ++) {
            if (i > 1) {
              $( `li[pos='${firstPiece[0]},${firstPiece[1]}']` ).css("background-color", "white");
            }
            this.piecePo[0] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
          }
          this.colorPos();
        } else {
          this.piecePos.forEach( (piecePo, idx) => {
            if (idx !== 1) {
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
            }
            piecePo[0] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
          });
        }
        break;

      case 'v2':

    }


    if (this.pieceLayout === 'horizontal') {
      if (this.piecePos.length < 4) {
        let firstPiece = JSON.parse(JSON.stringify(this.piecePos[0]));
        $( `li[pos='${firstPiece[0]},${firstPiece[1]}']` ).css("background-color", "white");
        this.piecePos.unshift(
          [0, firstPiece[1] - 2],
          [0, firstPiece[1] - 1],
          firstPiece
        );
        this.piecePos[3][0] += 1;
        this.colorPos();
      } else {
        this.piecePos.forEach( (piecePo, idx) => {
          if (idx < 3) {
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
          }
          piecePo[0] += 1;
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
        });
      }
    } else {
      if (this.piecePos.length < 4) {
        let secondPiece = JSON.parse(JSON.stringify(this.piecePos[this.piecePos.length-1]));
        this.piecePos.forEach( (piecePo, idx) => {
          if (idx === 0) {
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
          }
          piecePo[0] += 1;
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
        });
        this.piecePos.push(
          [0, secondPiece[1]]
        );
      } else {
        this.piecePos.forEach( (piecePo, idx) => {
          if(idx === 0 || idx === this.piecePos.length - 1) {
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
          }
          piecePo[0] += 1;
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
        });
      }
    }
  }




  rotate() {
    switch (this.pieceLayout) {
      case 'h1':
        this.piecePos.forEach( (piecePo, idx) => {
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
          switch (idx) {
            case 0:
              piecePo[0] += 1;
              piecePo[1] += 1;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
            case 1:
              piecePo[0] += 1;
              piecePo[1] += 1;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
            case 2:
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
            case 3:
              piecePo[0] -= 2;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
          }
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
        });
        this.pieceLayout = 'v1';
        break;
      case 'v1':
        this.piecePos.forEach( (piecePo, idx) => {
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
          switch (idx) {
            case 0:
              piecePo[0] -= 1;
              piecePo[1] -= 1;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
            case 1:
              piecePo[1] -= 2;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
            case 2:
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              piecePo[0] += 1;
              piecePo[1] -= 1;
              break;
            case 3:
              piecePo[0] += 2;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
          }
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
        });
        this.pieceLayout = 'h2';
        break;
      case 'h2':
        this.piecePos.forEach( (piecePo, idx) => {
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
          switch (idx) {
            case 0:
              piecePo[0] += 1;
              piecePo[1] += 1;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
            case 1:
              piecePo[0] -= 1;
              piecePo[1] += 1;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
            case 2:
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              piecePo[0] -= 2;
              break;
            case 3:
              piecePo[0] -= 2;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
          }
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
        });
        this.pieceLayout = 'v2';
        break;
      case 'v2':
        this.piecePos.forEach( (piecePo, idx) => {
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
          switch (idx) {
            case 0:
              piecePo[0] += 1;
              piecePo[1] += 1;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
            case 1:
              piecePo[0] -= 1;
              piecePo[1] += 1;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
            case 2:
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              piecePo[0] -= 2;
              break;
            case 3:
              piecePo[0] -= 2;
              $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
              break;
          }
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
        });
        this.pieceLayout = 'h1';
        break;
    }

  }




}

module.exports = JPiece;


/***/ }),
/* 5 */
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
    this.piecePos = [ [0, 4], [0, 5] ];
    this.colorPos();
  }

  moveDownOne() {
    if (this.piecePos.length < 4) {
      let oldTopPieces = JSON.parse(JSON.stringify(this.piecePos));
      this.piecePos = oldTopPieces.concat(this.piecePos);
      for(let i = 2; i < this.piecePos.length; i++) {
        this.piecePos[i][0] += 1;
        // let piecePo = this.piecePos[i];
        $( `li[pos='${this.piecePos[i][0]},${this.piecePos[i][1]}']` ).css("background-color", this.color());
      }
    } else {
      this.piecePos.forEach( (piecePo, idx) => {
        if (idx < 2) {
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
        }
        piecePo[0] += 1;
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
      });
    }
    // this.checkStop();
  }

  rotate() {
    if (this.pieceLayout === 'horizontal') {
      this.piecePos.forEach( (piecePo, idx) => {
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
        switch (idx) {
          case 0:
            piecePo[0] -= 2;
            piecePo[1] += 2;
            // if ( $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).attr("static") === "true") {
            //   $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            //   break;
            // }
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
          case 1:
            piecePo[0] -= 1;
            piecePo[1] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
          case 2:
            break;
          case 3:
            piecePo[0] += 1;
            piecePo[1] -= 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
        }
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
      });
      this.pieceLayout = 'vertical';
    } else {
      this.piecePos.forEach( (piecePo, idx) => {
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
        switch (idx) {
          case 0:
            piecePo[0] += 2;
            piecePo[1] -= 2;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
          case 1:
            piecePo[0] += 1;
            piecePo[1] -= 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
          case 2:
            break;
          case 3:
            piecePo[0] -= 1;
            piecePo[1] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
        }
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
      });
      this.pieceLayout = 'horizontal';

    }
  }

}

module.exports = OPiece;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__ (1);

$(document).one("keydown", function(e) {
  // debugger;

  if (e.which === 32) {
    new Game;
  }
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map