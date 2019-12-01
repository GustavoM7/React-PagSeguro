const express = require('express');
const routes = express.Router();

const Home = require('./routes/Home.js');
const PagSeguro = require('./routes/PagSeguro.js');

routes.get('/', Home.init);

routes.post('/pagseguro', PagSeguro.sendCheckout);

module.exports = routes;