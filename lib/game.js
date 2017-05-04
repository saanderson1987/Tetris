const $grid = $("#grid");

const addRow = (rowIdx) => {
  const $row = $("<ul>").addClass("row");
  for(let colIdx= 0; colIdx < 10; colIdx++) {
    const $square = $("<li>").addClass("square").attr("pos", [rowIdx, colIdx] );
    $row.append($square);
  }
  $grid.append($row);
};


for(let rowIdx = 0; rowIdx< 20; rowIdx++) {
  addRow(rowIdx);
}

///////////////////////////

// let colorPos = [0,3];
//
// $( `li[pos='${colorPos[0]},${colorPos[1]}']` ).css("background-color", "green");
//
// const moveDownOne = () => {
//   $( `li[pos='${colorPos[0]},${colorPos[1]}']` ).css("background-color", "white");
//   colorPos[0] += 1;
//   $( `li[pos='${colorPos[0]},${colorPos[1]}']` ).css("background-color", "green");
// };


// setInterval(moveDownOne, 750);

/////////////////////////////////



class I {

  constructor() {
    this.piecePos = [ [0, 3], [0, 4], [0,5], [0,6] ];
    this.setPos();
  }

  setPos() {
    this.piecePos.forEach( (colorPo) => {
      $( `li[pos='${colorPo[0]},${colorPo[1]}']` ).css("background-color", "green");
    });
  }

  resetPos() {
    this.piecePos = [ [0, 3], [0, 4], [0,5], [0,6] ];
    this.setPos();
  }

  moveDownOne() {
    this.piecePos.forEach( (colorPo) => {
      $( `li[pos='${colorPo[0]},${colorPo[1]}']` ).css("background-color", "white");
      colorPo[0] += 1;
      $( `li[pos='${colorPo[0]},${colorPo[1]}']` ).css("background-color", "green");
    });

    if (this.piecePos[0][0] === 19) {
      clearInterval(this.dropInterval);
      // const newPiece = new I;
      // newPiece.dropPiece();
      this.resetPos();
      this.dropPiece();
    }

    this.piecePos.some( (colorPo) => {
      if ($( `li[pos='${colorPo[0]+1},${colorPo[1]}']` ).css("background-color") === "rgb(0, 128, 0)"){
        clearInterval(this.dropInterval);
        // const newPiece = new I;
        // newPiece.dropPiece();
        this.resetPos();
        this.dropPiece();
        return true;
      }
    });
  }

  dropPiece() {
    this.dropInterval = setInterval(() => { this.moveDownOne(); }, 150);
  }

  moveLeft() {
    if (this.piecePos[0][1] === 0) {
      return;
    }
    this.piecePos.forEach( (colorPo) => {
      $( `li[pos='${colorPo[0]},${colorPo[1]}']` ).css("background-color", "white");
      colorPo[1] -= 1;
      $( `li[pos='${colorPo[0]},${colorPo[1]}']` ).css("background-color", "green");
    });
  }

  moveRight() {
    if (this.piecePos[0][1] === 9) {
      return;
    }
    this.piecePos.reverse().forEach( (colorPo) => {
      $( `li[pos='${colorPo[0]},${colorPo[1]}']` ).css("background-color", "white");
      colorPo[1] += 1;
      $( `li[pos='${colorPo[0]},${colorPo[1]}']` ).css("background-color", "green");
    });
  }

  rotate() {
    this.piecePos.forEach( (colorPo, idx) => {
      $( `li[pos='${colorPo[0]},${colorPo[1]}']` ).css("background-color", "white");
      switch (idx) {
      case 0:
        colorPo[0] -= 2;
        colorPo[1] += 2;
        break;
      case 1:
        colorPo[0] -= 1;
        colorPo[1] += 1;
        break;
      case 2:
        break;
      case 3:
        colorPo[0] += 1;
        colorPo[1] -= 1;
        break;
      }
      $( `li[pos='${colorPo[0]},${colorPo[1]}']` ).css("background-color", "green");
    });
  }

}

const IPiece = new I;
$(document).keydown( function(e) {
  switch (e.which) {
  case 37:
    IPiece.moveLeft();
    break;
  case 38:
    IPiece.rotate();
    break;
  case 39:
    IPiece.moveRight();
    break;
  }
});

IPiece.dropPiece();
