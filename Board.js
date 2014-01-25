var socket = io.connect("http://localhost", {port: 8000, transports: ["websocket"]});


var gameStarted = false;
    turn = false;
    symbol = '';

socket.on('msg', function(data){
  display(data.body);
});

socket.on('start', function(data){
  gameStarted = true;
  if(data.myTurn) {
    turn = true;
    symbol = data.symbol;
    display("Game Started. Make your move");
  }
  else display("Game Started. Waiting for other player's move");
});

var board = document.getElementById("board");

var moves = [[0,0,0],[0,0,0],[0,0,0]];

board.onclick = function(event) {
  var row = event.target.getAttribute('data-row'),
      col = event.target.getAttribute('data-column');

  if(gameStarted && turn && moves[row-1][col-1] == 0) {
    event.target.innerHTML = symbol;
    moves[row-1][col-1] = symbol;

    //Disable his turn
    turn = false;
  display("Waiting for other player's move");
    socket.emit('move', {x: row, y: col});

    //Check if this player Wins
    if(iWon(row-1, col-1)) display("You won");
    else if(gameOver()==true) display("Nobody Won");
  }
}

function gameOver() {
  for(var i=0; i<3; i++)
    for(var j=0; j<3; j++)
      if(moves[i][j]==0)
        return false;

  return true;
}

function iWon(i, j) {
  var thisMove = moves[i][j];
  //Check for row first
  if (moves[i][0] == moves[i][1] && moves[i][1] == moves[i][2])
    return true;
  //Check for column now
  if (moves[0][j] == moves[1][j] && moves[1][j] == moves[2][j])
    return true;

  //Check for leading diagonal
  if (moves[0][0] == thisMove && moves[1][1] == thisMove && moves[2][2] == thisMove)
    return true;
  //Check for other diagonal
  if (moves[0][2] == thisMove && moves[1][1] == thisMove && moves[2][0] == thisMove)
    return true;

  return false;
}

function display(str) {
  document.getElementById('message').innerHTML = str;
}