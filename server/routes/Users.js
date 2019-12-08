const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';

module.exports = {
  getAll(req, res){
    console.log("Buscando todos os usuários cadastrados...")
    User.findAll().then(users => {
      console.log("Lista de usuários retornada");
      res.send(users);
    }).catch(e => {
      console.log("Erro:" + e);
    });
  },

  create(req, res){
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    console.log("Criando novo usuário...");
    console.log("Verificando email...");
    User.findOne({where: {email: newUser.email}}).then(user =>{
      if(user){
        console.log("Conflito de email");
        res.send({error: "Email já possui cadastro", code: 409});

      } else {
        console.log("Gerando hash para senha...");
        const hash = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hash;

        User.create(newUser).then(user => {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {expiresIn: '7d'});
          console.log("Novo usuário criado, id:", user.id);
          console.log("Token gerado:", token);
          res.send({msg: "Sucess", code: 200});

        }).catch(error => {
          console.log("Erro:" + error);
          res.send("erro:" + error);

        });
      }
    }).catch(error => {
      console.log("Erro:" + error);
      res.send("erro:" + error);
    });
  },

  login(req, res){
    console.log("Realizando login, email:" + req.body.email);

    User.findOne({where: {email: req.body.email}}).then(user => {
      if(!user){
        console.log("Email não encontrado!");
        res.send({error: "Usuário não econtrado", code: 404});

      } else if(!bcrypt.compareSync(req.body.password, user.password)){
        console.log("Senha incompatível!");
        res.send({error: "Senha incorreta", code: 409});

      } else {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {expiresIn: '7d'});
        console.log("Enviando token de autenticação para usuário "+ user.id);
        res.json({token: token});

      }
    })
  },

  authenticate(req, res){
    console.log("Realizando autenticação para token: " + req.body.headers['Authorization']);
    jwt.verify(req.body.headers['Authorization'], process.env.SECRET_KEY, (err, decode) => {
      if(err){
        console.log("Autenticação mal sucedida!")
        res.send({error: "Usuário não econtrado", code: 404});
      } 

      else User.findOne({where: {id: decode.id}}).then(user =>{
        if(user){
          console.log("Usuário autenticado:"+ user.id);
          res.json(user);
        } 
        else {
          res.send({error: "Usuário não econtrado!", code: 404});
          console.log("Usuário não encontrado!");
        }
        
      }).catch(err => {
        console.log("Erro " + err);
        res.send('error:' + err);

      });
    });
    
  },

  delete(req, res){
    console.log("Removendo usuário de email:" + req.body.email);
    User.findOne({where: {email: req.body.email}}).then(user =>{
      if(!user){
        console.log("Usuário não encontrado!");
        res.send({error: "Usuário não econtrado", code: 404});

      } else {
        User.destroy({where: {email: req.body.email}}).then(() =>{
          console.log("Usuário removido!");
          res.send({msg: "Sucess", code: 200});

        }).catch(error => {
          console.log("Erro: " + error);
          res.send("erro:" + error);

        })
      }
    }).catch(error => {
      console.log("Erro:" + error);
      res.send("erro:" + error)
    });
  },

  update(req, res){
    console.log("Atualizando dados do usuário de email:"+ req.body.email);
    User.findOne({where: {email: req.body.email}}).then(user =>{
      if(!user){
        console.log("Usuário não encontrado!");
        res.send({error: "Usuário não econtrado", code: 404});

      } else {
        User.update(req.body, {where: {email: req.body.email}}).then(() =>{
          console.log("Dados atualizados!");
          res.send({msg: "Sucess", code: 200});

        }).catch(error => {
          console.log("Erro: "+ error);
          res.send("erro:" + error);
        })
      }
    }).catch(error => {
      console.log("Erro: "+ error);
      res.send("erro:" + error)
    
    });
  },

}