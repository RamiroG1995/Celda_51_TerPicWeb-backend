// Send Email

var nodemailer = require('nodemailer');

	module.exports = (formulario) => {

		var transporter = nodemailer.createTransport({
		 service: 'hotmail',
		 auth: {
		 user: 'ragalindos@hotmail.es', // Cambialo por tu email
		 pass: 'Ramirotiburon2100382122' // Cambialo por tu password
		 },
		 tls: {
      		rejectUnauthorized: false
    		}
		 });

		var mailOptions = {
		 from: 'ragalindos@hotmail.es',
		 to: 'ramirogalindo23@gmail.com', // Cambia esta parte por el destinatario
		 subject: formulario.asunto,
		 html: `
		 <strong>Nombre:</strong> ${formulario.nombre} <br/>
		 <strong>E-mail:</strong> ${formulario.email} <br/>
		 <strong>Mensaje:</strong> ${formulario.mensaje}
		 `
		 };

		transporter.sendMail(mailOptions, function (err, info) {
		 if (err)
		 console.log(err)
		 else
		 console.log(info);
		 });

	}