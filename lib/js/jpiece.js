const Piece = require('./piece');

class JPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "radial-gradient(#fb544e, #440704)";
  }

  setLayout() {
    return Math.floor(Math.random() * 4);
  }

  setPos() {
    this.rotationKeys = [
      [ [-3,3], [-3,4], [-3,5], [-2,5] ],
      [ [-2,3], [-4,4], [-3,4], [-2,4]  ],
      [ [-4,3], [-3,3], [-3,4], [-3,5] ],
      [ [-4,4], [-3,4], [-2,4], [-4,5] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }






}

module.exports = JPiece;
