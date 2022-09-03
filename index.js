'use strict'

var app = require('./app');
var port = 3700;



// Creación del servidor

app.listen(port, () => {
	console.log("El servidor está activo en la url: localhost:3700");
});


