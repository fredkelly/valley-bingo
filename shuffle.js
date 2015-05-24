$(function() {
  var GRID_SIZE = 4;
  var $table = $('table');
  var $cells = $('td', $table).sort(function() { return 0.5 - Math.random() });

  $cells
    .each(function(i, c) {
      $('tr:eq(' + Math.floor(i/GRID_SIZE) + ')').append(c);
    })
    .one('click', function(e) {
      $(e.target).addClass('called');
      $table.trigger('call', $cells.index(e.target));
    })
    .css('cursor', 'pointer');

  var totals = {
    rows: {},
    columns: {}
  };

  var findWinners = function(totals) {
    return Object.keys(totals).filter(function(t) {
      return totals[t] == GRID_SIZE;
    }).map(Number);
  };

  $table.on('call', function(e, cell) {
    var column = cell % GRID_SIZE,
        row = cell / GRID_SIZE | 0;

    totals.rows[row] = (totals.rows[row] || 0) + 1;
    totals.columns[column] = (totals.columns[column] || 0) + 1;

    findWinners(totals.rows).map(function(r) {
      $('tr:nth-of-type(' + (r + 1) + ') > td', $table).addClass('winner');
    });

    findWinners(totals.columns).map(function(c) {
      $('tr > td:nth-of-type(' + (c + 1) + ')', $table).addClass('winner');
    });
  });
});
