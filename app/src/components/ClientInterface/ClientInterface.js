import React, {Component} from "react";
import api from "../../service/Api";
import { Link } from "react-router-dom";
import Popup from "../Popup/Popup";
import Spinner from "../Spinner/Spinner";
import UpdateForm from "./UpdateForm";
import AuthConfirm from "./AuthConfirm";
import { connect } from "react-redux";
import { setUser } from "../../store/actions/user";
import authenticate from '../../service/authenticate';
import logout from '../../service/logout';

class ClientInterface extends Component {

  state = {
    loaded: false,
    userUpdate: {},
    popText: "",
    popWarning: false,
    popVisibility: false,
    popPermanent: false,
    infoVisibility: false,
    cepErrorMsg: "",
    password: "",
  }

  handleInput = (e) =>{
    this.setState({
      userUpdate: {[e.target.name]: e.target.value},
    })
  }

  handlePassword = (e) => {
    this.setState({password: e.target.value});
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

  handleInfo = () =>{
    this.state.infoVisibility ? setTimeout(() => this.setState({infoVisibility: false}), 0)
    : this.setState({infoVisibility: true});
    
  }

  callCepError = (msg) => {
    this.setState({cepErrorMsg: msg,});

  }

  searchCep = () =>{
    const cep = this.state.userUpdate.postal_code;
    
    if(cep && cep.length === 8){
      api.get("/Correios/CEP/"+cep).then(res => {
        if(res.data.error) this.callCepError("Erro inesperado... Tente mais tarde!");
        else if(res.data === "Formato invalido") this.callCepError("Formato inválido");
        else if(res.data === "Not found!") this.callCepError("CEP não encontrado...");
        else {
          const adress = res.data;
          this.setState({
            cepErrorMsg: "",
            userUpdate:{
              district: adress.bairro,
              city: adress.localidade,
              state: adress.uf,
              country: "BR", 
            }
          });

        }

      }).catch(e => {
        console.log(e);
        this.callCepError("Erro inesperado... Tente mais tarde!");

      })

    } else {
      this.callCepError("Insira um endereço de CEP válido");

    }

  }

  confirmUser = (type) => {
    this.callPopup("verificando...", false, true, true);
    const user = {
      email: this.props.user.email,
      password: this.state.password
    }

    api.post('/Users/Login', user).then(res => {
      if(res.data.error) this.callPopup("Não foi possível realizar login!", true, true, false);
      else {
        if(type === "delete"){
          this.callPopup("Excluindo conta...", false, true, true);
          this.removeUser();

        } else {
          this.callPopup("Atualizando dados...", false, true, true);
          this.updateUser();

        }
        
      }
    }).catch(e => {
      console(e);
      this.callPopup("Erro inesperado... Tente mais tarde!", true, true, false);

    })
  }

  removeUser = () => {
    api.post('/Users/Delete', {email: this.props.user.email}).then(res => {
      console.log(res);
      this.callPopup("Conta removida!", false, true, false);
      logout();

    }).catch(e => {
      console.log(e);
      this.callPopup("Erro inesperado... Tente mais tarde!", true, true, false);

    })
  }

  updateUser = () => {
    api.post("/Users/Update",{email: this.props.user.email, newUser: this.state.userUpdate }).then(res => {
      if(res.data.error === "Email já está cadastrado") this.callPopup("Este email já está cadastrado, tente outro email", true, true, false);
      else if(res.data.error){
        console.log(res.data.error);
        this.callPopup("Erro inesperado... Tente mais tarde!", true, true, false);
      } 

      else{
        this.callPopup("Dados atualizados!", false, true, false);
        window.location.reload();

      }
    }).catch(e => {
      console.log(e);
      this.callPopup("Erro inesperado... Tente mais tarde!", true, true, false);
      
    })
  }

  componentDidMount(){
    const loginToken = localStorage.getItem('@reactpagseguro/logintoken');

    if(!loginToken) window.location.replace('/Authenticate');

    else authenticate(loginToken, (res)=> {
      this.props.setUser(res.data);
      this.callPopup("Autenticado!", false, true, false);
      this.setState({userUpdate: res.data, loaded: true});

    }, console.log("Autenticação expirtada..."));
  }

  render(){
    const st = this.state;
    const user = this.props.state.user;

    if(!st.loaded) return(<Spinner/>);

    else return(
      <div className="App">
        <header className="App-header Half-screen">
          <h1>Área do cliente</h1>
          {user? <p>Bem vindo(a), <b>{user.name}</b></p>:null}
          <p>Acompanhe status das simualações</p>
          <p><Link to="/home" className="App-link">Tela inicial</Link></p>
          <p className="App-link" onClick={() => logout()}>
            Logout
          </p>
          <p id="configButton" className="App-link">
            Configurações
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

        <UpdateForm
          handleInput={this.handleInput}
          userUpdate={st.userUpdate}
          searchCep={this.searchCep}
        />

        <AuthConfirm
         listenersId={["remove", "removeConfirm"]}
         title="Tem certeza que deseja excluir sua conta?"
         text="Seus dados serão removidos permanentemente do banco de dados."
         st={st}
         handlePassword={this.handlePassword}
         type="delete"/>

        <AuthConfirm
         listenersId={["update", "updateConfirm"]}
         title="Tem certeza que deseja alterar seus dados?"
         text="Seus dados serão alterados permanentemente do banco de dados."
         password={st.password}
         handlePassword={this.handlePassword}
         delete="update"/>

      </div>
    )
  }
}

export default connect(
  state => ({state: state.user}),
  { setUser }
) (ClientInterface);