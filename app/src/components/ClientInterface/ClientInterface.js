import React, {Component} from "react";
import api from "../../service/Api";
import {Link} from "react-router-dom";
import Popup from "../Popup/Popup";

class ClientInterface extends Component {

  state = {
    user: null,
    popText: "",
    popWarning: false,
    popVisibility: false,
    popPermanent: false,
  }

  callPopup = (text, warning, visibility, permanent) =>{
    this.setState({
      popText: text,
      popWarning: warning,
      popVisibility: visibility,
      popPermanent: permanent,
    })
  }

  closePopup = () =>{
    this.setState({
      popText: "",
      popWarning: false,
      popVisibility: false,
      popPermanent: false,
    })
  }

  authenticate = (token) =>{
    api.post('/Users/Authenticate', {headers: {"Authorization" : token}}).then(res => {
        if(res.data.error) {
          console.log("Autenticação expirtada...");
          this.logout();
        }
        else{
          this.callPopup("Autenticado!", false, true, false);
          this.setState({user: res.data}); 
           
        } 
    
    }).catch(e => {
        console.log(e);
        this.logout();

    }) 
  }

  logout = () =>{
    localStorage.removeItem('@reactpagseguro/logintoken');
    window.location.replace('/Authenticate');
  }

  componentDidMount(){
    const loginToken = localStorage.getItem('@reactpagseguro/logintoken');
    if(!loginToken) window.location.replace('/Authenticate');
    else this.authenticate(loginToken);
  }

  render(){
    const st = this.state;

    return(
      <div className="App">
        <header className="App-header Half-screen">
          <h1>Área do cliente</h1>
          {st.user? <p>Bem vindo(a), <b>{st.user.name}</b></p>:null}
          <p>Acompanhe status das simualações</p>
          <p><Link to="/home" className="App-link">Tela inicial</Link></p>
          <p className="App-link" onClick={() => this.logout()}>
            Logout
          </p>
          <p className="App-link" onClick={() => this.logout()}>
            Atualizar dados
          </p>
        </header>

        <h3>SIMULACÕES</h3>

        <Popup 
        warning={st.popWarning}
        visible={st.popVisibility}
        permanent={st.popPermanent}
        onClose={this.closePopup}>
          {st.popText}
        </Popup>

      </div>
    )
  }
}

export default ClientInterface;