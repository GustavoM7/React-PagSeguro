const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {expiresIn: 1440});
          console.log("Novo usuário criado, token:", token);
          res.send({msg: "Sucess", code: 200});

        }).catch(error => {
          res.send("erro:" + error);

        });
      }
    }).catch(error => {
      res.send("erro:" + error);
    });
  },

  login(req, res){
    User.findOne({where: {email: req.body.email}}).then(user => {
      if(!user){
        res.send({error: "Usuário não econtrado", code: 404});

      } else if(!bcrypt.compareSync(req.body.password, user.password)){
        res.send({error: "Senha incorreta", code: 409});
      } else {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {expiresIn: 1440});
        res.jason({token: token});

      }
    })
  },

  authenticate(req, res){
    let decode = jwt.verify(req.headers['authotization'], process.env.SECRET_KEY);

    User.findOne({where: {id: decode.id}}).then(user =>{
      if(user) res.jason(user);
      else res.send({error: "Usuário não econtrado", code: 404});
      
    }).catch(err => {
      res.send('error:' + err);

    })
  },

  delete(req, res){
    User.findOne({where: {email: req.body.email}}).then(user =>{
      if(!user){
        res.send({error: "Usuário não econtrado", code: 404});

      } else {
        User.destroy({where: {email: req.body.email}}).then(() =>{
          res.send({msg: "Sucess", code: 200});
        }).catch(error => {
          res.send("erro:" + error);
        })
      }
    }).catch(error => {res.send("erro:" + error)});
  },

  update(req, res){
    User.findOne({where: {email: req.body.email}}).then(user =>{
      if(!user){
        res.send({error: "Usuário não econtrado", code: 404});

      } else {
        User.update(req.body, {where: {email: req.body.email}}).then(() =>{
          res.send({msg: "Sucess", code: 200});
        }).catch(error => {
          res.send("erro:" + error);
        })
      }
    }).catch(error => {res.send("erro:" + error)});
  },

}