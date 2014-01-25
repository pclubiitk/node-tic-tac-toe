var board = document.getElementById("board");

var turn = 'X'
var moves = [[0,0,0],[0,0,0],[0,0,0]];

board.onclick = function(event) {
  var row = event.target.getAttribute('data-row'),
      col = event.target.getAttribute('data-column');

  if(moves[row-1][col-1] == 0) {
    event.target.innerHTML = turn;
    turn = (turn == 'X') ? 'O' : 'X';
    moves[row-1][col-1] = turn;
  }
}