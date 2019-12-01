const express = require('express');
const cors = require('cors');
let bodyParser = require("body-parser");
const app = express();
const routes = require('./routes.js')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);
  
app.listen(3001, function () {
  console.log("CORS permitida na porta 3001");
});