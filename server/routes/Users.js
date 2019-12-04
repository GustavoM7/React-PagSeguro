const User = require('../models/User.js');

process.env.SECRET_KEY = 'secret';

module.exports = {
  getAll(req, res){
    User.findAll().then(users => {
      res.send(users);
    })
  },

  create(req, res){
    const newUser = {
      name: req.body.name,
      phone_code: req.body.phone_code,
      phone: req.body.phone,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      district: req.body.district,
      postal_code: req.body.postal_code,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      email: req.body.email,
      password: req.body.password,
    };

    User.findOne({where: {email: newUser.email}}).then(user =>{
      if(user){
        res.send({error: "Email já possui cadastro", code: 409})
      } else {
        User.create(newUser).then(user => {
          console.log("Novo usuário criado, id:", user.id);
          res.send({msg: "sucess", code: 200});
        }).catch(error => {
          res.send(error);
        })
      }
    });

  }


  /*createTest(req, res){
    User.sync().then(() => {
      return User.create({
        name: "TesteUser",
        phone_code: "55",
        phone: 88888888,
        street: "Rua teste",
        number: 41,
        complement: null,
        district: "Bairro teste",
        postal_code: "01452002",
        city: "Fortaleza",
        state: "CE",
        country: "BR",
        email: "gustavomarques@gmail.com",
        password: "123456",
      })
    })
    res.send("Usuário teste criado!")
  },*/
}