const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const routes = require('./routes.js');
const db = require('./localStorage/db.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

db.sequelize.sync();
  
app.listen(80, function () {
  console.log("API em execução na porta 80");
});