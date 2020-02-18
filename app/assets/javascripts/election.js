$(document).on('turbolinks:load', function() {
  var questions = [];
  var election_return = '';
  var str = $('#js_election').text();

  questions = str.split('/');
  questions.forEach( function( value, index ) {
    questions[index] = value.split(",");
  });

  questions.forEach( function( value, index ) {
    election_return = election_return + '<tr><td><p><label><input type="checkbox" name="check_' + value[0] + '" value="true"/><span></span></label></p></td><td>' + (index + 1) + '</td><td>' + value[1] + '</td><td>' + value[2] + '</td></tr>'
  });

  $('#return_area').html(election_return);

});
