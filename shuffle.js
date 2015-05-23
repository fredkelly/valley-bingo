$(function() {
  var $table = $('table');
  var $cells = $('td', $table).sort(function() { return 0.5 - Math.random() });;

  $cells
    .each(function(i, c) {
      $('tr:eq(' + Math.floor(i/4) + ')').append(c);
    })
    .on('click', function(e) {
      $(e.target).addClass('called');
    })
    .css('cursor', 'pointer');
});
