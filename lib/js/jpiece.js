const Piece = require('./piece');

class JPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "red";
  }

  setLayout() {
    return Math.floor(Math.random() * 4);
  }

  setPos() {
    this.rotationKeys = [
      [ [-1,3], [-1,4], [-1,5], [0,5] ],
      [ [0,3], [-2,4], [-1,4], [0,4]  ],
      [ [-2,3], [-1,3], [-1,4], [-1,5] ],
      [ [-2,4], [-1,4], [0,4], [-2,5] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }






}

module.exports = JPiece;
