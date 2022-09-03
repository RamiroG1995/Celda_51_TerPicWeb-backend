'use strict'

var db = require('../firebase');


var schema = db.collection('usuarios');

module.exports = schema;