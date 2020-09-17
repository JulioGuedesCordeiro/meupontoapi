const express = require('express');
const api = express.Router();

api.use(require('./ponto/ponto.router'));
api.use(require('./usuarios/usuarios.router'));
module.exports = api;