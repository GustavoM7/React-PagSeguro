const pagseguro = require('pagseguro');
const convert = require('xml-js');
const config = require('../globalconfig');
const axios = require('axios');
const Transaction = require('../models/Transation');

module.exports = {
  sendCheckout(req, res){
    let carrinho = req.body.carrinho;
    let comprador = req.body.comprador;
    let frete = req.body.frete;
  
    console.log("API PagSeguro Node chamada.");
    
    console.log("Configurando dados do vendedor...")
    //Configurações do vendedor
    pag = new pagseguro(config.PagSeguroConfig);
  
    //Configurando moeda e gerando referência da compra
    console.log("Configurando moeda referência de compra...");
    pag.currency('BRL');
    pag.reference(comprador.ref);
  
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
    pag.setNotificationURL("http://localhost:8080/pagseguro/status");
    
    //Enviando o xml ao pagseguro
    console.log("Recebendo chave para sessão de checkout de direcionamento");
  
    pag.send(function(err, pgres){
  
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
  },

  getAllTransaction(req, res){
    console.log("Buscando transações cadastradas...");
    Transaction.findAll().then(trans => {
      console.log("Uma lista de transações foi retornada!");
      res.send(trans);

    }).catch(e => {
      console.log("Erro inesperado...");
      console.log(e);
      res.sendStatos(500);

    });
  },

  getTransaction(req, res){
    const searchedCode = req.params.code;
    console.log("Transação requisitada, código: " + searchedCode);

    Transaction.findOne({where: {id: searchedId}}).then(trans => {
      if(!trans){
        console.log("Transação não encontrada...");
        res.sendStatus(404);
      }

      else {
        console.log("Transação retornada retornado");
        res.send(trans);
        
      }

    }).catch(e => {
      res.sendStatus(500);
      console.log(e);
    })
  },

  receiveStatus(req, res){
    console.log("Notificação de mudança de status de compra recebido!");
    const code = req.body.notificationCode;
    console.log("Código: " + code);
    res.send("recebido!");

    console.log("Buscando dados da compra...");
    const url = 'https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications/'+code+'?email='+config.PagSeguroConfig.email+'&token='+config.PagSeguroConfig.token;

    axios({
      method: 'get',
      url: url,
      
    }).then(res => {
      console.log("Resposta recebida!");
      resjson = convert.xml2json(res.data, {compact: true, spaces: 4});
      const data = JSON.parse(resjson)
      console.log("Códgo de transação: " + data.transaction.code._text);

    }).catch(e => {
      console.log("Erro! " + e.message);

    })

  }
}