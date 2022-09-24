var express = require('express');
var socket = require('socket.io');
// App setup
var app = express();

var server = app.listen(4000, function (){
  console.log('listen to requests on port 4000');
});

//Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server, {
    cors: {
        origin: "http://localhost:4000",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});
// console.log(io);
io.on('connection', function (socket){
  console.log('made socket connection', socket.id);

  socket.on('chat', function (data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });

});
