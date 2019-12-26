const express = require('express');
const routes = express.Router();

const Home = require('./routes/Home.js');
const Users = require('./routes/Users.js');
const Items = require('./routes/Items');
const PagSeguro = require('./routes/PagSeguro.js');
const Correios = require('./routes/Correios');

routes.get('/', Home.init);
routes.get('/Users', Users.getAll);
routes.get('/Correios/CEP/:cep', Correios.AdressGeter);
routes.get('/Items', Items.getAll);
routes.get('/Itemsteste', Items.create);

routes.post('/Users', Users.create);
routes.post('/Users/Login', Users.login);
routes.post('/Users/Authenticate', Users.authenticate);
routes.post('/Users/Delete', Users.delete);
routes.post('/Users/Update', Users.update);

routes.post('/Items', Items.create);

routes.post('/pagseguro', PagSeguro.sendCheckout);
routes.post('/pagseguro/status', PagSeguro.receiveStatus);

module.exports = routes;