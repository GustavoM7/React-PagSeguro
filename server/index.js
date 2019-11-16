let pagseguro = require('pagseguro');
let convert = require('xml-js');
const express = require('express');
const cors = require('cors');
let bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.send('API em execução!');
});

app.post('/pagseguro', function (req, res){
  let carrinho = req.body.carrinho;
  let comprador = req.body.comprador;
  let frete = req.body.frete;

  console.log("API PagSeguro Node chamada.");
  
  console.log("Configurando dados do vendedor...")
  //Configurações do vendedor
  pag = new pagseguro({
      email: 'gustavosmarquesf@gmail.com',
      token: '695040B1D32F4F008D776C6A9032CB3A', //Este token deve ser guardado de forma segura
      mode : 'sandbox', //Modo de teste, deve ser alterado para produção
  });

  //Configurando moeda e gerando referência da compra
  console.log("Configurando moeda referência de compra...");
  pag.currency('BRL');
  pag.reference('teste5');

  console.log("Registrando produtos..")
  carrinho.map(produto => {
    return pag.addItem({
        id: produto.id,
        description: produto.description,
        amount: produto.amount,
        quantity: produto.quantity,
        weight: produto.weight
    });
  });

  //Configurando as informações do comprador
  console.log("Registradando dados do comprador...")
  pag.buyer({
    name: comprador.name,
    email: comprador.email,
    phoneAreaCode: comprador.phoneAreaCode,
    phoneNumber: comprador.phoneNumber
  });
   
  //Configurando a entrega do pedido
  console.log("Registrando dados do frete...")
  pag.shipping({
    type: 1,
    street: frete.street,
    number: frete.number,
    complement: frete.complement,
    district: frete.district,
    postalCode: frete.postalCode,
    city: frete.city,
    state: frete.state,
    country: frete.country,
  });
   
  //Configuranto URLs de retorno e de notificação
  pag.setRedirectURL("http://localhost:3000");
  pag.setNotificationURL("http://localhost:3000");
  
  //Enviando o xml ao pagseguro
  console.log("Recebendo chave para sessão de checkout de direcionamento");

  pag.send(function(err, pgres){
    let convert = require('xml-js');

    if (err) {
      //Convertendo resposta xml para json
      console.log("ERRO!")
      res.send(convert.xml2json(err, {compact: true, spaces: 4}));
    } else {
      let key = convert.xml2json(pgres, {compact: true, spaces: 4});
      console.log("chave gerada:");
      let keyobj = JSON.parse(key);
      console.log(keyobj.checkout.code._text)
      res.send(key);
    } 
  });
});
  
app.listen(3001, function () {
  console.log("CORS permitida na porta 3001");
});