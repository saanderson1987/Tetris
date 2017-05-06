


const $grid = $("#grid");

const addRow = (rowIdx) => {
  const $row = $("<ul>").addClass("row").attr("row", rowIdx);
  for(let colIdx= 0; colIdx < 10; colIdx++) {
    const $square = $("<li>").addClass("square").attr("pos", [rowIdx, colIdx] );
    $row.append($square);
  }
  return $row;
  // $grid.append($row);
};


for(let rowIdx = 0; rowIdx< 20; rowIdx++) {
  // addRow(rowIdx);
  $grid.append(addRow(rowIdx));
}

///////////////////////////////

class I {

  constructor() {
    this.piecePos = [ [0, 3], [0, 4], [0,5], [0,6] ];
    this.setPos();
    this.pieceLayout = 'horizontal';
  }

  setPos() {
    this.piecePos.forEach( (piecePo) => {
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
    });
  }

  resetPos() {
    if (this.pieceLayout === 'horizontal') {
      this.piecePos = [ [0, 3], [0, 4], [0,5], [0,6] ];
      this.setPos();
    } else {
      this.piecePos = [ [0,4] ];
      this.setPos();
    }
  }

  moveDownOne() {
    if (this.pieceLayout === 'horizontal') {
      this.piecePos.forEach( (piecePo) => {
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
        piecePo[0] += 1;
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
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
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
        });
      } else {
        this.piecePos.forEach( (piecePo, idx) => {
          if (idx === 0) {
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
          }
          piecePo[0] += 1;
          $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
          if (idx === 3) {
          }
        });
      }
    }


    this.piecePos.some( (piecePo) => {
      if (piecePo[0] === 19) {
        // debugger;
        this.makeStatic();
        clearInterval(this.dropInterval);
        this.rowIsComplete();
        this.resetPos();
        this.dropPiece();
        return true;
      }
    });

    this.piecePos.some( (piecePo) => {
      if ($( `li[pos='${piecePo[0]+1},${piecePo[1]}']` ).attr("static") === "true"){
        this.makeStatic();
        clearInterval(this.dropInterval);
        this.rowIsComplete();
        this.resetPos();
        this.dropPiece();

        return true;
      }
    });


  }



  rowIsComplete() {
    const clearRow = this.clearRow;
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
          clearRow(piecePo[0]);
          completedRows.push(piecePo[0]);
        }
      });
    });

    let rowsToClear = completedRows.filter( (row, index) => {
      return completedRows.indexOf(row) === index;
    });

  }

  clearRow(row) {
    $(`ul[row=${row}]`).each( function () {
      $( this ).remove();
    });

    $grid.prepend(addRow(1));

    $('ul').each( function (rowIdx) {
      $( this ).attr('row', rowIdx);
      $( this ).children().each( function(colIdx) {
        $( this ).attr('pos', [rowIdx, colIdx]);
      });
    });

  }

  makeStatic() {
    this.piecePos.forEach( (piecePo) => {
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).attr("static", "true");
    });
  }

  dropPiece() {
    this.dropInterval = setInterval(() => { this.moveDownOne(); }, 150);
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
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
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
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
    });
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
            //   $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
            //   break;
            // }
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
            break;
          case 1:
            piecePo[0] -= 1;
            piecePo[1] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
            break;
          case 2:
            break;
          case 3:
            piecePo[0] += 1;
            piecePo[1] -= 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
            break;
        }
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
      });
      this.pieceLayout = 'vertical';
    } else {
      this.piecePos.forEach( (piecePo, idx) => {
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
        switch (idx) {
          case 0:
            piecePo[0] += 2;
            piecePo[1] -= 2;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
            break;
          case 1:
            piecePo[0] += 1;
            piecePo[1] -= 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
            break;
          case 2:
            break;
          case 3:
            piecePo[0] -= 1;
            piecePo[1] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
            break;
        }
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "green");
      });
      this.pieceLayout = 'horizontal';

    }
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
