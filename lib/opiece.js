const Piece = require('./piece');

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
