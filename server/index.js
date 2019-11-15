import callPagSeguro from "./PagSeguro";

const express = require('express');
const cors = require('cors');
const app = express();

app.get('/', function (req, res) {
    res.send('API em execução!');
});

app.post('/pagseguro', function (req, res){
  let resps = callPagSeguro(req.carrinho, req.comprador, req.frete);
  res.send(resps);
});


app.use(cors());
  
app.listen(3001, function () {
  console.log("CORS permitida na porta 3001");
});