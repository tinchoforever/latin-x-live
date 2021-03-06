var express = require('express');
var app = express();
var path = require("path");
var http = require('http').Server(app);
var io = require('socket.io')(http);


var mongoose = require ("mongoose"); // The reason for this demo.

    // Here we find an appropriate database to connect to, defaulting to
    // localhost if we don't find one.
    var uristring =
    process.env.MONGODB_URI ||
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/HelloMongoose';
 // Makes connection asynchronously.  Mongoose will queue up database
    // operations and release them when the connection is complete.
    mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

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
    console.log('LatinX',  msg.filename );
    var lx = new LatinX({ filename: msg.filename });
    lx.save();

  });
});

app.get('/users', function(req, res){
   LatinX.find({}, function(err, users) {
               res.json(users)
        });
});
var port = process.env.PORT || 3000
http.listen(port, function(){
  console.log('listening on *:3000');
});