class Grid {

  constructor(grid, height, width) {
    this.grid = grid;
    this.height = height;
    this.width = width;
    this.setDimensions();
    this.create();
  }

  setDimensions() {
    this.grid.width(this.width*25);
  }

  create() {
    for(let rowIdx = 0; rowIdx< this.height; rowIdx++) {
      this.grid.append(this.addRow(rowIdx));
    }
  }

  addRow(rowIdx) {
    const $row = $("<ul>").addClass("row").attr("row", rowIdx);
    for(let colIdx= 0; colIdx < this.width; colIdx++) {
      const $square = $("<li>").addClass("square").attr("pos", [rowIdx, colIdx] );
      $row.append($square);
    }
    return $row;
  }

  clearRows(rows) {

    rows.forEach( (row) => {
      this.clearRow(row);
    });
  }

  clearRow(row) {
    $(`ul[row=${row}]`).each( function () {
      $( this ).remove();
    });

    this.grid.prepend(this.addRow(1));

    $('ul').each( function (rowIdx) {
      $( this ).attr('row', rowIdx);
      $( this ).children().each( function(colIdx) {
        $( this ).attr('pos', [rowIdx, colIdx]);
      });
    });

  }


}

module.exports = Grid;
