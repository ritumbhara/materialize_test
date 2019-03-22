$(function() {
  var playerMove = "X";
  var compMove = "O";
  var boxid, i, j;
  var game = false;
  var firstCompMove = true;
  var boxes = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  var score = [0, 0, 0];
  var win = [
    // all winning combinations
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  var firstArr = [0, 2, 4, 6, 8]; //where computer makes its first move

  $("#playX").click(function() {
    //click on X button
    playerMove = "X";
    compMove = "O";
    resetGame();
  });
  $("#playR").click(function() {
    //click on RESET button
    resetGame();
  });

  $("#playO").click(function() {
    //click on O button
    playerMove = "O";
    compMove = "X";
    resetGame();
    compsTurn();
  });

  $(".box").click(function() {
    //click on a box
    boxid = $(this).attr("id");
    if (game && boxes[boxid] == " ") {
      playersTurn(boxid, playerMove);
      compsTurn();
    }
  });

  //FUNCTIONS

  //player's move – put X or O in a box
  function playersTurn(n, sign) {
    boxes[n] = sign;
    $("#" + n).addClass(sign);
    $("#" + n).text(sign);
    checkWin();
    checkTie();
  }

  //computer's move
  function compsTurn() {
    if (game) {
      //check if it's the first computer move and put O (compMove) in the center
      if (firstCompMove) {
        if (boxes[4] == " ") {
          boxes[4] = compMove;
          $("#4").addClass(compMove);
          $("#4").text(compMove);
          firstCompMove = false;
          return;
        } else {
          //if center is occupied, put O (compMove) in a random corner
          do {
            var a = firstArr[Math.floor(Math.random() * 4 + 1)];
          } while (boxes[a] == playerMove);
          boxes[a] = compMove;
          $("#" + a).addClass(compMove);
          $("#" + a).text(compMove);
          firstCompMove = false;
          return;
        }
      }

      //looking for string with two Os (compMove's) – trying to win
      for (i = 0; i < 8; i++) {
        var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
        if (winstr == " " + compMove + compMove) {
          boxes[win[i][0]] = compMove;
          $("#" + win[i][0]).addClass(compMove);
          $("#" + win[i][0]).text(compMove);
          checkWin();
          return;
        } else if (winstr == compMove + " " + compMove) {
          boxes[win[i][1]] = compMove;
          $("#" + win[i][1]).addClass(compMove);
          $("#" + win[i][1]).text(compMove);
          checkWin();
          return;
        } else if (winstr == compMove + compMove + " ") {
          boxes[win[i][2]] = compMove;
          $("#" + win[i][2]).addClass(compMove);
          $("#" + win[i][2]).text(compMove);
          checkWin();
          return;
        }
      }

      //looking for string with two Xs (playerMove's) - prevent player from winning
      for (i = 0; i < 8; i++) {
        var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
        if (winstr == " " + playerMove + playerMove) {
          boxes[win[i][0]] = compMove;
          $("#" + win[i][0]).addClass(compMove);
          $("#" + win[i][0]).text(compMove);
          checkWin();
          checkTie();
          return;
        } else if (winstr == playerMove + " " + playerMove) {
          boxes[win[i][1]] = compMove;
          $("#" + win[i][1]).addClass(compMove);
          $("#" + win[i][1]).text(compMove);
          checkWin();
          checkTie();
          return;
        } else if (winstr == playerMove + playerMove + " ") {
          boxes[win[i][2]] = compMove;
          $("#" + win[i][2]).addClass(compMove);
          $("#" + win[i][2]).text(compMove);
          checkWin();
          checkTie();
          return;
        }
      }

      //check if there is row where there is O compMove but no X playerMove
      for (i = 0; i < 8; i++) {
        var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
        if (
          winstr.indexOf(playerMove) == -1 &&
          winstr.indexOf(compMove) != -1
        ) {
          for (j = 0; j < 3; j++) {
            if (boxes[win[i][j]] == " ") {
              boxes[win[i][j]] = compMove;
              $("#" + win[i][j]).addClass(compMove);
              $("#" + win[i][j]).text(compMove);
              checkWin();
              checkTie();
              return;
            }
          }
        }
      }

      //check if empty row or column and put O (comp Move) there
      for (i = 0; i < 8; i++) {
        var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
        if (winstr == "   ") {
          boxes[win[i][0]] = compMove;
          $("#" + win[i][0]).addClass(compMove);
          $("#" + win[i][0]).text(compMove);
          checkWin();
          checkTie();
          return;
        }
      }

      // put O (compMove) in a first available empty box
      for (i = 0; i < 8; i++) {
        if (boxes[i] == " ") {
          boxes[i] = compMove;
          $("#" + i).addClass(compMove);
          $("#" + i).text(compMove);
          checkWin();
          checkTie();
          return;
        }
      }
    }
  }

  // reset game
  function resetGame() {
    boxes.fill(" ");
    $(".box").removeClass("X");
    $(".box").removeClass("O");
    $(".box").text(" ");
    game = true;
  }

  //check if win
  function checkWin() {
    for (i = 0; i < 8; i++) {
      var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
      if (winstr == playerMove + playerMove + playerMove) {
        //if player won
        if (playerMove == "X") {
          Materialize.toast("You won!", 4000, "purple darken-3");
        } else {
          Materialize.toast("You won!", 4000, "teal accent-4");
        }
        game = false;
        firstCompMove = true;
        score[0]++;
        $("#score-player").html("&nbsp;" + score[0] + "&nbsp;");
      } else if (winstr == compMove + compMove + compMove) {
        //if computer won
        if (compMove == "O") {
          Materialize.toast("Better luck next time!", 4000, "blue accent-4");
        } else {
          Materialize.toast("Better luck next time!", 4000, "pink darken-3");
        }
        game = false;
        firstCompMove = true;
        score[2]++;
        $("#score-comp").html("&nbsp;" + score[2] + "&nbsp;");
      }
    }
  }

  //check if tie
  function checkTie() {
    var tieflag = true;
    for (i = 0; i < 8; i++) {
      var winstr = boxes[win[i][0]] + boxes[win[i][1]] + boxes[win[i][2]];
      if (winstr.indexOf("X") == -1 || winstr.indexOf("O") == -1) {
        tieflag = false;
      }
    }
    if (tieflag) {
      Materialize.toast("It's a tie!", 4000, green);
      game = false;
      firstCompMove = true;
      score[1]++;
      $("#score-tie").html("&nbsp;" + score[1] + "&nbsp;");
    }
  }
});
