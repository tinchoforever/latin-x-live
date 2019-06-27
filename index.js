var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
var io = require('socket.io')(http);


var mongoose = require ("mongoose"); // The reason for this demo.

    // Here we find an appropriate database to connect to, defaulting to
    // localhost if we don't find one.
    var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/HelloMongoose';


var Cat = mongoose.model('Cat', { name: String });
var kitty = new Cat({ name: 'Zildjian' });


kitty.save().then(() => console.log('meow'));
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
 
var LatinX = mongoose.model('LatinX', { filename: String });


io.on('connection', function(socket){

  socket.on('user move', function(msg){
    io.emit('user move', msg);
  });
  socket.on('new-user', function(msg){
    io.emit('new-user', msg);
  });
  socket.on('user-vote', function(msg){
    io.emit('user-vote', msg);
    var lx = new LatinX({ filename: msg.filename });
    lx.save().then(() => console.log('lx'));

  });
});
var port = process.env.PORT || 3000
http.listen(port, function(){
  console.log('listening on *:3000');
});