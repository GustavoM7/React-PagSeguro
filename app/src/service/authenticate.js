import logout from './logout';

const authenticate = (token, sucess, error) =>{
  const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {'Authorization': token}
  });

  api.post('/Users/Authenticate', {headers: {"Authorization" : token}}).then(res => {
    if(res.data.error) {
      console.log("Autenticação expirtada...");
      error();
      logout();
    }

    else{
      sucess();
    } 

})
  .catch(e => {
    console.log(e);
    error();
    logout();

  }) 
}

export default authenticate;