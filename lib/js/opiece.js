const Piece = require('./piece');

class OPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "blue";
  }

  setPos() {
    this.piecePos = [ [0, 4], [-1, 4], [0, 5], [-1, 5] ];
    this.colorPos();
  }

  rotate() {
    return;
  }

}

module.exports = OPiece;
