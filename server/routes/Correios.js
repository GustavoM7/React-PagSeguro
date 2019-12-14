const axios = require("axios");

module.exports = {
  AdressGeter(req, res){
    const cep = req.params.cep;
    console.log("Solicitando endereço para CEP: "+cep);
    const validaCep = /^[0-9]{8}$/;

    if(validaCep.test(cep)){
      const url = "http://viacep.com.br/ws/"+cep+"/json/";
      console.log("Solicitando endereço para CEP: "+cep)
    
      axios({
        method: 'get',
        url: url,

      }).then(response => {
        console.log("Consulta de CEP solicitada a API com sucesso!");
        if(response.data.error) {
          console.log("CEP não encontrado...");
          res.status(404).send("Not found!");
        }

        else res.send(response.data);
        
      }).catch(e => {
        console.log("Consulta de CEP solicitada a API com erro inesperado...");
        res.status(500).send({error: e});
    
      })
    } else {
      console.log("Formato de cep inválido!");
      res.status(400).send("Formato invalido");

    }
    
  },
}