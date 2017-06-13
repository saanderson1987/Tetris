class Grid {

  constructor() {
    this.grid = $("#grid");
    this.create();
  }

  create() {
    for(let rowIdx = 0; rowIdx< 20; rowIdx++) {
      this.grid.append(this.addRow(rowIdx));
    }
  }

  addRow(rowIdx) {
    const $row = $("<ul>").addClass("row").attr("row", rowIdx);
    for(let colIdx= 0; colIdx < 10; colIdx++) {
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
