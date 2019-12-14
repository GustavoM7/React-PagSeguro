import axios from 'axios';

const AdressGeter = (cep) =>{
  const url = "viacep.com.br/ws/"+cep+"/json/";

  axios({
    method: 'get',
    url: 'http://'+url,
  })
    .then(response => {
      console.log(response);
      return response;

    }).catch(e => {
        console.log(e);
        return e;

    })

}

export default AdressGeter;