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
			return(`<li class="message">
					<strong class="float-right">${elem.usuario}: </strong>
					<em class="me float-right">${elem.texto}</em>
				</li>`)
		} else {
			return(`<li class="message">
					<strong>${elem.usuario}: </strong>
					<em>${elem.texto}</em>					
				</li>`)
		}
	}).join(" ");

	document.getElementById('chatdata').innerHTML = html;
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
