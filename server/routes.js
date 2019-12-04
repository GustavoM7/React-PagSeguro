const express = require('express');
const routes = express.Router();

const Home = require('./routes/Home.js');
const Users = require('./routes/Users.js');
const PagSeguro = require('./routes/PagSeguro.js');

routes.get('/', Home.init);
routes.get('/Users', Users.getAll)

routes.post('/pagseguro', PagSeguro.sendCheckout);

module.exports = routes;