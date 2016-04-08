var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mensajes = [];

io.on('connection', function(socket) {
	var address = socket.handshake.address;
	console.log("Connection from: " + address.address);
	socket.emit('messages', mensajes);
})

server.listen(8080, function() {

})