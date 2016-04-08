var socket = io.connect('', {'forceNew': true});

socket.on('messages', function(data) {
	console.log(data);
})