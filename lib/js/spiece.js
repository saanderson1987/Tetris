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
      [ [-1,3], [-1,4], [-2,4], [-2,5] ],
      [ [-1,4], [-2,4], [0,5], [-1,5] ],
      [ [0,3], [0,4], [-1,4], [-1,5] ],
      [ [-2,3], [-1,3], [-1,4], [0,4] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }





}

module.exports = SPiece;
