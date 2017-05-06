const Piece = require('./piece');

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
    this.checkStop();
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

module.exports = IPiece;
