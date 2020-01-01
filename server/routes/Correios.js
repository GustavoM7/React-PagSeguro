const axios = require("axios");

/*
 - AdressGeter: get em um cep (/:cep), e retorna um objeto com dados do endereço
 retorno:
 {
    district: "", //bairro
    city: "", //cidade
    state: "", //estado
    country: "BR",             
 }
*/

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
        if(response.data.erro) {
          console.log("CEP não encontrado...");
          res.send("Not found!");
        }

        else res.send(response.data);
        
      }).catch(e => {
        console.log("Consulta de CEP solicitada a API com erro inesperado...");
        res.send({error: e});
    
      })
    } else {
      console.log("Formato de cep inválido!");
      res.send("Formato invalido");

    }
    
  },
}