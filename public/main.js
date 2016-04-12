if(Cookies.get('name') == null) {
	var resuname = prompt("Introduce nombre de usuario", "");
	if(resuname != null) {
		Cookies.set('name', resuname, {expires: 7, path: '/'});
	} else {
		Cookies.set('name', 'usuario', {expires: 7, path: 7});
	}
}

var socket = io.connect(window.location.host);

function render(data) {
	var html = data.map(function(elem, index) {
		if(elem.usuario == Cookies.get('name')) {
			return(`<div>
					<strong>${elem.usuario}: </strong>
					<em id="me">${elem.texto}</em>
			</div>`)
		} else {
			return(`<div id="my-message">
					<strong>${elem.usuario}: </strong>
					<em>${elem.texto}</em>
			</div>`)
		}
	}).join(" ");

	document.getElementById('chat').innerHTML = html;
}

function addMessage() {
	var texto = document.getElementById("cajaT");
	if(texto != null || texto != "") {
		var mensaje = {
			usuario: Cookies.get('name'),
			texto: texto.value
		};
		socket.emit('newMessage', mensaje);
	}
	document.getElementById("cajaT").value = "";
}

socket.on('messages', function(data) {
	render(data);
	$('#chat').scrollTop($("#chat")[0].scrollHeight);
});
