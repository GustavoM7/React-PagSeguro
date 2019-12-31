const pagseguro = require('pagseguro');
const convert = require('xml-js');
const config = require('../globalconfig');
const axios = require('axios');

const Transaction = require('../models/Transaction');
const TransactionRegister = require('../models/TransactionRegister');

/*
  Métodos exportados:
  - sendCheckout: recebe dados de uma compra e retorna chave para redirecionamento de checkout
  - receiveStatus: recebe cógido de notificação da PagSeguro, o código é usado para consultar uma nova transação cadastrada ou alterada
  - getAllTrasactions: busca todas as transações cadastradas no banco de dados
  - getTransaction: busca os dados de uma transação específica a partir do seu código (/:code)
  - getUserTransaction: busca todas as transações realizadas por um usuário através da referência
  - getTransactionRegister: busca todos os registros de itens de uma transação através de seu código (/:code)
*/

module.exports = {
  sendCheckout(req, res){

    //Estrutura da requisição
    /*
    {
      carrinho: [{
        id: '0',
        description: 'abc',
        amount: '00.00',
        quantity: 0,
        weight: '00'
      }],

      comprador: {
        name: 'abc',
        email: 'abc@dominio.com',
        phoneAreaCode: '00',
        phoneNumber: '00000000'
        ref: 'XX'
      },

      frete = {
        type: 1,
        street: 'abc',
        number: 'abc',
        complement: 'abc',
        district: 'abc',
        postalCode: 'abc',
        city: 'abc',
        state: 'abc',
        country: BR,
      }
    }

    */

    let carrinho = req.body.carrinho;
    let comprador = req.body.comprador;
    let frete = req.body.frete;
  
    console.log("API PagSeguro Node chamada.");
    
    console.log("Configurando dados do vendedor...")
    //Configurações do vendedor
    /*
      {
        email: ' ',
        token: ' ', //Token deve ser gerado na plataforma da PagSeguro e guardado de forma segura
        mode : 'sandbox', //Modo de teste, deve ser alterado para produção
      }
    */

    pag = new pagseguro(config.PagSeguroConfig);
  
    //Configurando moeda e referência da compra usanda para chaves extrangeiras
    console.log("Configurando moeda referência de compra...");
    pag.currency('BRL');
    pag.reference(comprador.ref);
  
    console.log("Registrando produtos..");
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
        console.log(keyobj.checkout.code._text);

        //Retorrnando uma chave para a requisição
        //A chave deve ser usada na url para acessar um link de checkout
        //'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code='+key (sandbox)
        res.send(key);
      } 
    });
  },

  getAllTransactions(req, res){
    console.log("Buscando todas as transações cadastradas...");
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

    Transaction.findOne({where: {code: searchedCode}}).then(trans => {
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
    });
  },

  getUserTransaction(req, res){
    const userId = req.params.user;
    console.log("Buscando transações realizadas pelo usuário de id " + userId);

    Transaction.findAll({where: {reference: userId}}).then(trans => {
      if(!trans){
        console.log("Nenhuma transação encontrada...");
        res.sendStatus(404);
      }

      else {
        console.log("Lista de itens retornada!");
        res.send(trans);
        
      }

    }).catch(e => {
      res.sendStatus(500);
      console.log(e);

    });

  },

  getTransactionRegister(req, res){
    const code = req.params.code;
    console.log("Buscando itens da transação de cógido " + code);

    TransactionRegister.findAll({where: {transactionCode: code}}).then(itens => {
      if(!itens){
        console.log("Nenhuma transação encontrada...");
        res.sendStatus(404);
      }

      else {
        console.log("Lista de transações retornada!");
        res.send(itens);
        
      }

    }).catch(e => {
      res.sendStatus(500);
      console.log("Erro inesperado...")
      console.log(e);

    });

  },

  receiveStatus(req, res){
    //POST será realizado pela plataforma da PagSeguro
    console.log("Notificação de mudança de status de compra recebido!");
    const code = req.body.notificationCode;
    
    console.log("Código: " + code);
    console.log("Buscando dados da compra...");

    const url = 'https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications/'+code+'?email='+config.PagSeguroConfig.email+'&token='+config.PagSeguroConfig.token;

    //Buscando dados da transação realizada a partir do código recebido da PagSeguros
    axios({
      method: 'get',
      url: url,
      
    }).then(ret => {
      console.log("Resposta recebida!");
      resjson = convert.xml2json(ret.data, {compact: true, spaces: 4});
      const data = JSON.parse(resjson);

      const transData = {
        code: data.transaction.code._text,
        date: data.transaction.date._text,
        reference: data.transaction.reference._text,
        status: data.transaction.status._text,
        /*
          1 = Aguardando pagamento
          2 = Em Análise
          3 = Paga
          4 = Disponível (saque pode ser feito)
          5 = Em disputa (comprador reinvidicou reembolso ou devolução com a PagSeguro)
          6 = Devolvida
          7 = Cancelada
          8 = Debitada
          9 = Retenção temporária
        */
        paymentMethod: data.transaction.paymentMethod.type._text,
        /*
          1 = Cartão de Crédito
          2 = Boleto
          3 = Débito online
        */
        grossAmount: data.transaction.grossAmount._text,
        discountAmount: data.transaction.discountAmount._text,
        intermediationRateAmount: data.transaction.creditorFees.intermediationRateAmount._text,
        intermediationFeeAmount: data.transaction.creditorFees.intermediationFeeAmount._text,
        netAmount: data.transaction.netAmount._text,
        extraAmount: data.transaction.extraAmount._text,
        installmentCount: data.transaction.installmentCount._text,
        itemCount: data.transaction.itemCount._text,
        senderName: data.transaction.sender.name._text,
        senderEmail: data.transaction.sender.email._text,
        senderPhoneAreaCode: data.transaction.sender.phone.areaCode._text,
        senderPhoneNumber: data.transaction.sender.phone.number._text,
        shippingStreet: data.transaction.shipping.address.street._text,
        shippingNumber: data.transaction.shipping.address.number._text,
        shippingComplement: data.transaction.shipping.address.complement._text,
        shippingDistrict: data.transaction.shipping.address.district._text,
        shippingCity: data.transaction.shipping.address.city._text,
        shippingState: data.transaction.shipping.address.state._text,
        shippingCountry: data.transaction.shipping.address.country._text,
        shippingPostalCode: data.transaction.shipping.address.postalCode._text,
        shippingCost: data.transaction.shipping.cost._text,
      }

      const items = data.transaction.items.item;

      console.log("Códgo de transação: " + transData.code);

      //Verificando se transação já está cadastrada no bd
      //Caso ela já exista, significa que seu status foi alterado
      Transaction.findOne({where: {code: transData.code}}).then(trans => {
        if(trans){
          console.log("Atualizando transação no banco de dados...");
          Transaction.update(transData, {where: {code: transData.code}}).then(()=>{
            console.log("Transação atualizada!");
            res.send("Transação atualizada!");

          }).catch(e => {
            console.log("Erro inesperado ao tentar atualizar transação!");
            console.log(e);
            res.sendStatus(500);

          })

        }
  
        else {
          console.log("Registrando nova transação...");
          Transaction.create(transData).then(t => {
            console.log("Nova transação registrada!");
            console.log("Registrando itens...");

            let newRegister;

            items.forEach(i => {
              newRegister = {
                transactionCode: t.code,
                itemId: i.id._text,
                itemQuantity: i.quantity._text,
                itemDescription: i.description._text,
                itemAmount: i.amount._text,
              }

              TransactionRegister.create(newRegister).then(r => {
                console.log("Novo registro criado, id: ", r.id);

              }).catch(e => {
                console.log("falha ao tentar criar registro de itens de transação!");
                console.log(e);

              })

            });

            res.send("Transação registrada!");

          }).catch(e => {
            console.log("Erro inesperado ao tentar registrar trannsação...");
            console.log(e);
            res.sendStatus(500);

          })
          
        }
  
      }).catch(e => {
        console.log("Erro inesperado ao tentar buscar código de transação...");
        console.log(e);
        res.sendStatus(500);

      });

    }).catch(e => {
      console.log("Erro inesperado ao tentar se conectar com api PagSeguro");
      console.log(e);
      res.sendStatus(500);

    })

  }
}