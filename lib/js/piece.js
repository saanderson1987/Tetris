


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

      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
    });
  }

  moveDownOne() {
    this.piecePos.forEach( (piecePo, idx) => {

      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "transparent");
      piecePo[0] += 1;
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
      this.colorPos();
    });

  }

  rotate() {

    let newPieceLayout = (this.pieceLayout + 1) % this.rotationKeys.length;



    if (this.validMove(newPieceLayout)) {
      this.piecePos.forEach( (piecePo, idx) => {
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "transparent");
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
      return !($( `li[pos='${newPiecePo}']` ).attr("static") === "true") && newPiecePo[1] >= 0 && newPiecePo[1] <= 9;

    });
  }




  checkStop() {
    let gameOver = true;
    for (let i = 0; i < this.piecePos.length; i++) {
      let piecePo = this.piecePos[i];
      if (piecePo[0] === 19
        || $( `li[pos='${piecePo[0]+1},${piecePo[1]}']` ).attr("static") === "true"
      ){
        return "make static";
      } else if (piecePo[0] === -1
        && $( `li[pos='${piecePo[0]+1},${piecePo[1]}']` ).attr("static") === "true"
      )
        return "game over";
    }


    //
    // let gameOver = true;
    // for (let i = 0; i < this.piecePos.length; i++) {
    //   let piecePo = this.piecePos[i];
    //   if (piecePo[0] === 19
    //     || $( `li[pos='${piecePo[0]+1},${piecePo[1]}']` ).attr("static") === "true"
    //   ){
    //     if (piecePo[0] < 0) {
    //       return "game over";
    //     } else {
    //       return "make static";
    //     }
    //   }
    // }

    // return this.piecePos.some( (piecePo) => {
    //   if (piecePo[0] === 19
    //     || $( `li[pos='${piecePo[0]+1},${piecePo[1]}']` ).attr("static") === "true"
    //   ){
    //     if (piecePo[0] < 0) {
    //       return "game over";
    //     } else {
    //       return "make static";
    //     }
    //   }
    // });
  }

  makeStatic() {
    this.piecePos.forEach( (piecePo) => {
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).attr("static", "true");
    });
  }

  completedRows() {
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
          // grid.clearRow(piecePo[0]);
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
      || $( `li[pos='${leftPiece[0]},${leftPiece[1]-1}']` ).attr("static") === "true"
    ){
      return;
    }

    this.piecePos.forEach( (piecePo) => {
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "transparent");
      piecePo[1] -= 1;
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
    });

    this.colorPos();
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
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "transparent");
      piecePo[1] += 1;
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
    });

    this.colorPos();
  }

  // dropPiece() {
  //   this.dropInterval = setInterval(() => { this.moveDownOne(); }, 150);
  // }




}

module.exports = Piece;
