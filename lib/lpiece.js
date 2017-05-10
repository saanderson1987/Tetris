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
      [ [0,3], [-1,3], [-1,4], [-1,5] ],
      [ [-2,3], [-2,4], [-1,4], [0,4] ],
      [ [-1,3], [-1, 4], [-1, 5], [-2, 5] ],
      [ [-2,4], [-1,4], [0, 4], [0, 5] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = LPiece;
