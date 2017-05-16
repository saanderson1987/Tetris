const Piece = require('./piece');

class ZPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "cyan";
  }

  setLayout() {
    return Math.floor(Math.random() * 2);

  }

  setPos() {

    this.rotationKeys = [
      [ [-2,3], [-2,4], [-1,4], [-1,5] ],
      [ [-1,4], [-2,5], [0,4], [-1,5] ],
      [ [-1,3], [-1,4], [0,4], [0,5]],
      [ [-1,3], [-2,4], [0,3], [-1,4]]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = ZPiece;
