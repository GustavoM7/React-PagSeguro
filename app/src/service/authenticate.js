import logout from './logout';
import axios from 'axios';

const authenticate = (token, sucess, error) =>{
  const api = axios.create({
    baseURL: "http://localhost:80",
    headers: {'Authorization': token}
  });

  api.post('/Users/Authenticate', {headers: {"Authorization" : token}}).then(res => {
    if(res.data.error) {
      console.log("Autenticação expirtada...");
      if(error) error();
      logout();
    }

    else{
      if(sucess) sucess(res);
    } 

})
  .catch(e => {
    console.log(e);
    if(error) error();
    logout();

  }) 
}

export default authenticate;