$(document).on('turbolinks:load', function() {
  var questions = [];
  var language = $('#js_language').text();
  var format = $('#js_format').text();
  var str = $('#js_study').text();
  var index = 0;
  var correct = false;
  var score = [0, 0];
//------------------------------------------------------------------------------
  var result_return = "";
//------------------------------------------------------------------------------
  var answer = "";
  var next = false;
//------------------------------------------------------------------------------

  //questions配列の整形開始
  questions = str.split('/');
  questions.forEach( function( value, index ) {
    questions[index] = value.split(",");
  });
  //終わり

//------------------------------------------------------------------------------

  //関数定義開始

  //初期化用関数群
  function config_study_title() {
    $('#study_title').text(format + ' (' + (index + 1) + '/' + questions.length + ')');
  }

  function hide_correct() {
    $('#correct').hide();
    correct = false;
  }

  function config_score() {
    $('#score0').text(score[0]);
    $('#score1').text(score[1]);
  }

  function language_branch() {
    if (language == "j->e") {
      $('#question_word').text(questions[index][1]);
      $('#correct').text(questions[index][0]);
    } else {
      $('#question_word').text(questions[index][0]);
      $('#correct').text(questions[index][1]);
    }
  }

  function format_branch() {
    if (format == "say") {
      $('#input_field').hide();
    } else {
      $('#next-btn').addClass('disabled');
    }
    language_branch();
  }

  function initialize() {
    format_branch();
    $('#end-btn').hide();
    config_study_title();
    hide_correct();
    config_score();
    $('#result_wrapper').hide();
  }
  //初期化群終わり

  //判定用関数群
  function success_branch(correctness) {
    if (correctness) {
      return '<i class="material-icons green-text accent-3">check</i>';
    } else {
      next = true;
      return '<i class="material-icons red-text accent-2">clear</i>';
    }
  }

  function result_make(correctness) {
    icon = success_branch(correctness);
    if (format == "write") {
      result_return = result_return + '<tr><td>' + (index + 1) + '</td><td>' + $('#question_word').text() + '</td><td>' + $('#correct').text() + '</td><td>' + answer +'</td><td>' + icon + '</td></tr>';
    } else {
      $('#reply').hide();
      result_return = result_return + '<tr><td>' + (index + 1) + '</td><td>' + $('#question_word').text() + '</td><td>' + $('#correct').text() + '</td><td>' + icon + '</td></tr>';
    }
  }

  function judgment() {
    if (correct) {
      score[1] += 1;
      result_make(false);
    } else if (format == "write") {
      if (answer.trim() == $('#correct').text().trim()) {
        score[0] += 1;
        result_make(true);
      } else {
         score[1] += 1;
         result_make(false);
      }
    } else {
      score[0] += 1;
      result_make(true);
    }
    config_score();
  }

  //判定用関数群終わり

  //出題用関数群
  function result_btn_branch() {
    if (language == "e->j" && format == "write") {
      $('#result_end_btn').show();
      $('#result_next_btn').hide();
    } else {
      $('#result_end_btn').hide();
      $('#result_next_btn').show();
    }
  }

  function last_question_branch() {
    if (index + 1 == questions.length) {
      $('#next-btn').hide();
      $('#end-btn').show();
      if (format == "write") {
        $('#end-btn').addClass('disabled');
      }
    } else {
      $('#next-btn').show();
      $('#end-btn').hide();
    }
  }

  $('#next-btn').click(function() {
    judgment()
    index += 1;
    language_branch();
    config_study_title();
    last_question_branch();
    hide_correct();
    if (format == "write") {
      document.input_field.textarea.value="";
      $('#input_field').show();
    }
  });

  $('#correct-show-btn').click(function() {
    $('#correct').show();
    correct = true;
    $('#input_field').hide();
    if (format == "write") {
      $('#next-btn').removeClass('disabled');
      $('#end-btn').removeClass('disabled');
    }
  });

  $('#end-btn').click(function() {
    judgment();
    $('#study_wrapper').hide();
    $('#result_wrapper').show();
    $('#result_return').html(result_return);
    result_btn_branch()
    if (next) {
      $('#result_end_btn').hide();
      $('#result_next_btn').hide();
    }
  });

  $(document).on('click',function(e) {
    if (format == "write") {
      if(!$(e.target).closest('#textarea').length) {
        // ターゲット要素の外側をクリックした時の操作
        answer = document.input_field.textarea.value;
        if (answer == "") {
          answer = "(No response)";
          $('#correct-show-btn').removeClass('disabled');
          if (!correct) {
            $('#next-btn').addClass('disabled');
            $('#end-btn').addClass('disabled');
          }
        } else {
          $('#next-btn').removeClass('disabled');
          $('#end-btn').removeClass('disabled');
        }
      } else {
        // ターゲット要素をクリックした時の操作
        $('#correct-show-btn').addClass('disabled');
      }
    }
  });
  //出題用関数群終わり
//------------------------------------------------------------------------------

  initialize();

});
