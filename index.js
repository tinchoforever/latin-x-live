var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/", express.static(path.join(__dirname, "public")));



io.on('connection', function(socket){
  console.log('a user connected');
});
io.set('origins', '*github*:*');

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
 


io.on('connection', function(socket){

  socket.on('user move', function(msg){
    io.emit('user move', msg);
  });
  socket.on('new-user', function(msg){
    io.emit('new-user', msg);
  });
  socket.on('user-vote', function(msg){
    io.emit('user-vote', msg);
  });
});
var port = process.env.PORT || 3000
http.listen(port, function(){
  console.log('listening on *:80');
});