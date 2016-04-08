var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mensajes = [];

app.use(express.static('public'));

app.get('/hello', function(req, res) {
	res.status(200).send("Hello world");
});

io.on('connection', function(socket) {
	var address = socket.handshake.address;
	console.log("Connection from: " + address.address);
	socket.emit('messages', mensajes);

	socket.on('newMessage', function(data) {
		mensajes.push(data);
		console.log(data);
		io.sockets.emit('messages', mensajes);
	});
});

server.listen(8080, function() {

});