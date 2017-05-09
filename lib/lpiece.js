const Piece = require('./piece');

class LPiece extends Piece  {

  constructor(grid){
    super(grid);

  }

  color() {
    return "yellow";
  }

  setLayout() {
    return 3;
    // return Math.floor(Math.random() * 4);
    // // let layoutNum = Math.floor(Math.random() * 4) + 1;
    // // switch (layoutNum) {
    // //   case 1:
    // //     return 'h1';
    // //   case 2:
    // //     return 'v1';
    // //   case 3:
    // //     return 'h2';
    // //   case 4:
    // //     return 'v2';
    // // }
  }
  setPos() {

    this.rotationKeys = [
      [ [0,3], [-1,3], [-1,4], [-1,5] ],
      [ [-2, 4], [-2,5], [-1,5], [0,5] ],
      [ [0, 3], [0, 4], [0, 5], [-1, 5] ],
      [ [-2,4], [-1,4], [0, 4], [0, 5] ]
    ];

    this.piecePos = JSON.parse(JSON.stringify(this.rotationKeys[this.pieceLayout]));

    this.colorPos();
  }

  moveDownOne() {
    this.piecePos.forEach( (piecePo, idx) => {

      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
      piecePo[0] += 1;
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", this.color());
      this.colorPos();
    });

  }

  rotate() {
    this.piecePos.forEach( (piecePo) => {
      $( `li[pos='${piecePo[0]},${piecePo[1]}']` ).css("background-color", "white");
    });

    let newPieceLayout = (this.pieceLayout + 1) % 4;
    this.piecePos.forEach( (piecePo, idx) => {

      piecePo[0] += this.rotationKeys[newPieceLayout][idx][0] - this.rotationKeys[this.pieceLayout][idx][0];
      piecePo[1] += this.rotationKeys[newPieceLayout][idx][1] - this.rotationKeys[this.pieceLayout][idx][1];

    });
    this.pieceLayout = newPieceLayout;
    this.colorPos();

  }

}

module.exports = LPiece;
