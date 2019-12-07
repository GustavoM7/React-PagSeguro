const express = require('express');
const routes = express.Router();

const Home = require('./routes/Home.js');
const Users = require('./routes/Users.js');
const PagSeguro = require('./routes/PagSeguro.js');

routes.get('/', Home.init);
routes.get('/Users', Users.getAll);
routes.get('/Users/Authenticate', Users.authenticate);

routes.post('/Users', Users.create);
routes.post('/Users/Login', Users.login);
routes.post('/Users/Authenticate', Users.authenticate);
routes.post('/pagseguro', PagSeguro.sendCheckout);

module.exports = routes;