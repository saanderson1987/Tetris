const Piece = require('./piece');

class IPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "green";
  }

  setLayout() {
    return Math.floor(Math.random() * 2);
  }

  setPos() {

    this.rotationKeys = [
      [ [-1, 3], [-1, 4], [-1,5], [-1,6] ],
      [ [-3, 4], [-2, 4], [-1, 4], [0, 4] ],
      [ [-2, 3], [-2, 4], [-2,5], [-2,6] ],
      [ [-3, 5], [-2, 5], [-1, 5], [0, 5] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }



}

module.exports = IPiece;
