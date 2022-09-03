 'use strict'

var express = require('express');
var D1Controller = require('../controllers/D1');


var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.post('/save-d1', D1Controller.saveD1);
router.get('/get-d1/:id?', D1Controller.getD1);
router.get('/list-d1/:collection', D1Controller.listD1);
router.delete('/delete-d1/:id', D1Controller.deleteD1);
router.put('/mod-d1/:id', D1Controller.modD1);
router.post('/upload-img/:id', multipartMiddleware, D1Controller.uploadImage);
router.get('/get-image/:image', D1Controller.getImageFile);
router.post('/form', D1Controller.sendEmail2);

module.exports = router;