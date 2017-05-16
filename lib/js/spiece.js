const Piece = require('./piece');

class SPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "orange";
  }

  setLayout() {
    return Math.floor(Math.random() * 2);

  }

  setPos() {

    this.rotationKeys = [
      [ [-3,3], [-3,4], [-4,4], [-4,5] ],
      [ [-3,4], [-4,4], [-2,5], [-3,5] ],
      [ [-2,3], [-2,4], [-3,4], [-3,5] ],
      [ [-4,3], [-3,3], [-3,4], [-2,4] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = SPiece;
