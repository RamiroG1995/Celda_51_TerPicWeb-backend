'use strict'


var schema = require('../models/D1');
var fs = require('fs');
var path = require('path');
var db = require('../firebase');
var mail = require('./mail');


var controller = {

	
	test: function(req, res){
		return res.status(200).send({
			message: 'Soy el metodo test'
		});
	},


	// Crear y guardar proyectos

	saveD1: async function(req, res){
		
		var datos = req.body;

		if(datos == null) return res.status(404).send({message: 'El proyecto no existe'});
		await schema.add(req.body);
		return res.status(200).send('Nuevo usuario creado');
	},


	// Obtener un proyecto de acuerdo a su ID

	getD1: async function(req, res){

		var usuarioId = req.params.id;
		if(usuarioId == null) return res.status(404).send({message: 'El proyecto no existe'});
		var result = await schema.doc(usuarioId).get();
		var usuario = {
			id: result.id,
			...result.data()
		}

	
		return res.status(200).send(usuario);
		
	},


	// Obtener la lista de todos los proyectos

	listD1: async function(req, res){
		var Collection = req.params.collection;
		var result = await db.collection(Collection).get();
		var usuarios = result.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));
			return res.status(200).send(usuarios); 
	},


	// Eliminar proyectos de acuerdo a su ID

	deleteD1: async function(req, res){

		var usuarioId = req.params.id;
		if(usuarioId == null) return res.status(404).send({message: 'El proyecto no existe'});
		var res_delete = await db.collection('Pixel Survive').doc(usuarioId).delete();
		return res.status(200).send({message: 'Usuario Eliminado'});
		
	},

	// Modificar proyectos

	modD1: async function(req, res){

		var usuarioId = req.params.id;
		var datos = req.body;

		if(usuarioId == null) return res.status(404).send({message: 'El proyecto no existe'});
		var res_update = await schema.doc(usuarioId).update(datos);
		var result = await schema.doc(usuarioId).get();

		var usuario = {
			id: result.id,
			...result.data()
		};

		return res.status(200).send({
			message: 'Usuario Actualizado',
			usuario
		});
		
	},

	// Subir imágenes

	uploadImage: async function(req, res){

		var usuarioId = req.params.id;
		var fileName = 'Imagen no subida';

		if(req.files){

			var filePath = req.files.img.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('.');
			var fileExt = extSplit[1];
			console.log(fileExt);

			if(fileExt == 'png' || fileExt == 'jpg'){
				var res_update = await schema.doc(usuarioId).update({image: fileName});
				var result = await schema.doc(usuarioId).get();

				var usuario = {
					id: result.id,
					...result.data()
				};

				return res.status(200).send({
					usuario: usuario
				});
			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({
						message: 'La extensión no es válida'
					});
				});
			}

			
		}else{
			return res.status(200).send({
				message: fileName
			});
		}
	},

	// Obtener imágenes

	getImageFile: function(req, res){
		var file = req.params.image;
		var path_file = './uploads/'+file;
		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen"
				});
			}
		});
	},


	// send email

	sendEmail2: function(req, res){
		mail(req.body);
		res.status(200).send({
			Mail: req.body
		});
	}

};

module.exports = controller;