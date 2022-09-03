'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

// Archivos de Rutas
var D1_routes = require('./routes/D1');

// Middlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Rutas

app.use('/api', D1_routes);


// Exportar el módulo
module.exports = app;