const Piece = require('./piece');

class IPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "radial-gradient(#4eab4e, #051905)";
  }

  setLayout() {
    return Math.floor(Math.random() * 2);
  }

  setPos() {

    this.rotationKeys = [
      [ [-3, 3], [-3, 4], [-3,5], [-3,6] ],
      [ [-5, 4], [-4, 4], [-3, 4], [-2, 4] ],
      [ [-4, 3], [-4, 4], [-4,5], [-4,6] ],
      [ [-5, 5], [-4, 5], [-3, 5], [-2, 5] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));
    this.colorPos();
  }



}

module.exports = IPiece;
