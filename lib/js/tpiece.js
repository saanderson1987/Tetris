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
      [ [-3, 3], [-4,4], [-3,4], [-3,5] ],
      [ [-3,4], [-4,4], [-2,4], [-3,5] ],
      [ [-3,3], [-3,4], [-2,4], [-3,5] ],
      [ [-3,3], [-4,4], [-2,4], [-3, 4]]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = TPiece;
