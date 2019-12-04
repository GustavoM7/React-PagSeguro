const User = require('../models/User.js');

module.exports = {
  getAll(req, res){
    User.findAll().then(users => {
      res.send(users);
    })
  },

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