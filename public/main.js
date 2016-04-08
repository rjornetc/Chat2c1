if(Cookies.get('name') == null) {
	var resuname = prompt("Introduce nombre de usuario", "");
	if(resuname != null) {
		Cookies.set('name', resuname, {expires: 7, path: '/'});
	} else {
		Cookies.set('name', 'usuario', {expires: 7, path: 7});
	}
}

var socket = io.connect(location.origin.replace(/^http/, 'ws'));

function render(data) {
	var html = data.map(function(elem, index) {
		return(`<div>
				<strong>${elem.athor}</strong>
				<em>${elem.text}</em>
		</div>`)
	}).join(" ");

	document.getElementById('chat').innerHTML = html;
}

function addMessage() {
	var texto = document.getElementById("cajaT");
	if(texto != null) {
		var mensaje = {
			usuario: Cookies.get('name'),
			texto: texto.value
		};
		socket.emit('newMessage', mensaje);
	}
}

socket.on('messages', function(data) {
	render(data);
});
