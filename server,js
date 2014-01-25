/**************************************************
** NODE.JS REQUIREMENTS
**************************************************/
var io = require("socket.io");        // Socket.IO


/**************************************************
** GAME VARIABLES
**************************************************/
var socket,   // Socket controller
  player1, player2;


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
  //Initialise players
  player1 = player2 = 0;

   // Set up Socket.IO to listen on port 8000
  socket = io.listen(8000);

  // Configure Socket.IO
  socket.configure(function() {
    // Only use WebSockets
    socket.set("transports", ["websocket"]);

    // Restrict log output
    socket.set("log level", 2);
  });

  // Start listening for events
  setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
  // Socket.IO
  socket.sockets.on("connection", onSocketConnection);
};

// New socket connection
function onSocketConnection(client) {
  console.log("New player has connected: "+client.id);

  if(player1 == 0) {
    client.emit("msg", {body: "Waiting for other player"});
    player1 = client;
    client.on("move", player1Move);
  }
  else if(player2 == 0) {
    player2 = client;
    player1.emit("start", {myTurn: true, symbol: 'X'});
    player2.emit("start", {myTurn: false, symbol: 'O'});
    client.on("move", player2Move);
  }
  else client.emit("msg", {body: "No room for more players"});

  // Listen for client disconnected
  client.on("disconnect", onClientDisconnect);
};

// Socket client has disconnected
function onClientDisconnect() {
  console.log("Player has disconnected: "+this.id);

};

function player1Move(data) {
  player2.emit('move', data);
}

function player2Move(data) {
  player1.emit('move', data);
}
/**************************************************
** RUN THE GAME
**************************************************/
init();