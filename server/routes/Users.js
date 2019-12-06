const User = require('../models/User.js');
const bcrypt = require ('bcryptjs');

process.env.SECRET_KEY = 'secret';

module.exports = {
  getAll(req, res){
    User.findAll().then(users => {
      res.send(users);
    });
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
        res.send({error: "Email já possui cadastro", code: 409});

      } else {
        const hash = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hash;

        User.create(newUser).then(user => {
          console.log("Novo usuário criado, id:", user.id);
          res.send({msg: "sucess", code: 200});

        }).catch(error => {
          res.send(error);

        });
      }
    });
  }
}