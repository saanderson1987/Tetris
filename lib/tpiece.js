const Piece = require('./piece');

class TPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "purple";
  }

  setLayout() {
    return Math.floor(Math.random() * 4);

  }

  setPos() {

    this.rotationKeys = [
      [ [-1, 3], [-2,4], [-1,4], [-1,5] ],
      [ [-1,4], [-2,4], [0,4], [-1,5] ],
      [ [-1,3], [-1,4], [0,4], [-1,5] ],
      [ [-1,3], [-2,4], [0,4], [-1, 4]]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = TPiece;
