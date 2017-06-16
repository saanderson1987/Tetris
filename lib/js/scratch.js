// for the display of the next piece

makePieces() {
  this.pieces = [];

  for (let i = 0; i < 2; i++) {
    this.pieces.push(this.generatePiece());
  }

}

this.currentPiece = this.pieces.shift();
this.pieces.push(this.generatePiece());
