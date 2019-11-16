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
  //console.log(req.body);
  let resps = pagSeguroFunc(req.body.carrinho, req.body.comprador, req.body.frete);
  //console.log(resps.ref);
  res.send(resps);
});
  
app.listen(3001, function () {
  console.log("CORS permitida na porta 3001");
});


const pagSeguroFunc = (carrinho, comprador, frete) =>{
  let pag, pagseguro;
  pagseguro = require('pagseguro');
  //Configurações do vendedor
  pag = new pagseguro({
      email: 'gustavosmarquesf@gmail.com',
      token: '695040B1D32F4F008D776C6A9032CB3A',
      mode : 'sandbox',
  });

  //Configurando moeda e gerando referência da compra
  pag.currency('BRL');
  pag.reference('teste5');

  if(carrinho !== undefined)
    carrinho.forEach(produto => {
        pag.addItem({
            id: produto.id,
            description: produto.titulo,
            amount: produto.preco,
            quantity: produto.qtd,
            weight: produto.peso
        });
    });

  //Configurando as informações do comprador
  pag.buyer({
      name: comprador.name,
      email: comprador.email,
      phoneAreaCode: comprador.phoneAreaCode,
      phoneNumber: comprador.phoneNumber
  });
   
  //Configurando a entrega do pedido
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
  let out = pag.send((err, res) => {
      if (err) {
        console.log(err)
          return err;
      }
      console.log(res);
      return res;
  });

  return out;

}