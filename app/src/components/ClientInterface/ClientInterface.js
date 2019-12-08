import React, {Component} from "react";
import api from "../../service/Api";

class ClientInterface extends Component {

  authenticate = (token) =>{
    api.post('/Users/Authenticate', {headers: {"Authorization" : token}}).then(res => {
        if(res.error) console.log("Autenticação expirtada...");
        else console.log("Autenticado!");
    
    }).catch(e => {
        console.log(e);

    }) 
  }

  render(){
    return(
      <div className="App">

      </div>
    )
  }
}

export default ClientInterface;