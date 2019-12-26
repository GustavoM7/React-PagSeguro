const Item = require('../models/Item');

module.exports = {
  getAll(req, res){
    console.log(req.headers);
    console.log("Buscando itens cadastrados...");
    Item.findAll().then(itens => {
      console.log("Uma lista de itens foi retornada");
      res.send(itens);

    }).catch(e => {
      console.log("Erro inesperado...");
      res.send(e);

    });

  },

  create(req, res){
    const newItem = {
        description: "Primeiro produto",
        amount: "10.00",
        quantity: 3,
        weight: "10"
    }

    console.log("Registrando novo produto...");
    Item.create(newItem).then(item => {
      console.log("Novo produto criado, id: " + item.id);
      res.send(200);
    }).catch(e => {
      console.log("Erro inesperado...");
      res.send(e);
    })
  }
}