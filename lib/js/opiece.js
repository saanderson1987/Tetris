const Piece = require('./piece');

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
