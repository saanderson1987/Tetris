const Piece = require('./piece');

class OPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "radial-gradient(#6d6dff, #282871)";
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
