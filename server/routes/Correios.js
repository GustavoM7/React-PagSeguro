const axios = require("axios");

module.exports = {
  AdressGeter(req, res){
    const url = "http://viacep.com.br/ws/"+req.params.cep+"/json/";
    console.log("Solicitando endereço para CEP: "+req.params.cep)

    axios({
      method: 'get',
      url: url,
    }).then(response => {
      console.log("Consulta de CEP solicitada a API com sucesso!");
      res.send(response.data);
    
    }).catch(e => {
      console.log("Consulta de CEP solicitada a API com erro inesperado...");
      console.log(e);
      res.send(e);

    })
    
  },
}