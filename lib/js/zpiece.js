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
      [ [-4,3], [-4,4], [-3,4], [-3,5] ],
      [ [-3,4], [-4,5], [-2,4], [-3,5] ],
      [ [-3,3], [-3,4], [-2,4], [-2,5]],
      [ [-3,3], [-4,4], [-2,3], [-3,4]]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = ZPiece;
