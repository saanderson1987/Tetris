const Piece = require('./piece');

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
    // debugger;
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
    if (this.pieceLayout === 'horizontal') {
      this.piecePos.forEach( (piecePo, idx) => {
        $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
        switch (idx) {
          case 0:
            piecePo[0] += 2;
            piecePo[1] -= 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
          case 1:
            piecePo[0] += 1;
            $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
            break;
          case 2:
            break;
          case 3:
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

module.exports = JPiece;
