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

  get(req, res){
    const searchedId = req.params.id;
    console.log("Produto requisitado, id: " + searchedId);

    Item.findOne({where: {id: searchedId}}).then(item => {
      if(!item){
        console.log("Produto não encontrado...");
        res.sendStatus(404);
      } 
      else {
        console.log("Produto retornado");
        res.send(item);
        
      }

    }).catch(e => {
      res.sendStatus(500);
      console.log(e);
    })
  },

  create(req, res){
    const newItem = {
      description: req.body.description,
      amount: req.body.amout,
      weight: req.body.weight,
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