const Piece = require('./piece');

class LPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "yellow";
  }

  setLayout() {
    return Math.floor(Math.random() * 4);

  }

  setPos() {

    this.rotationKeys = [
      [ [-2,3], [-3,3], [-3,4], [-3,5] ],
      [ [-4,3], [-4,4], [-3,4], [-2,4] ],
      [ [-3,3], [-3, 4], [-3, 5], [-4, 5] ],
      [ [-4,4], [-3,4], [-2, 4], [-2, 5] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = LPiece;
