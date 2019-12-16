import React, {Component} from "react";
import api from "../../service/Api";
import {Link} from "react-router-dom";
import Popup from "../Popup/Popup";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";
import UpdateForm from "./UpdateForm";

class ClientInterface extends Component {

  state = {
    loaded: false,
    user: null,
    userUpdate: null,
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

  authenticate = (token) =>{
    api.post('/Users/Authenticate', {headers: {"Authorization" : token}}).then(res => {
        if(res.data.error) {
          console.log("Autenticação expirtada...");
          this.logout();
        }
        else{
          this.callPopup("Autenticado!", false, true, false);
          this.setState({user: res.data, userUpdate: res.data, loaded: true}); 
           
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

  confirmUser = (type) => {
    this.callPopup("verificando...", false, true, true);
    const user = {
      email: this.state.user.email,
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
    api.post('/Users/Delete', {email: this.state.user.email}).then(res => {
      console.log(res);
      this.callPopup("Conta removida!", false, true, false);
      this.logout();

    }).catch(e => {
      console.log(e);
      this.callPopup("Erro inesperado... Tente mais tarde!", true, true, false);

    })
  }

  updateUser = () => {
    api.post("/Users/Update",{email: this.state.user.email, newUser:this.state.userUpdate }).then(res => {
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
    else this.authenticate(loginToken);
  }

  render(){
    const st = this.state;

    if(!st.loaded) return(<Spinner/>);

    else return(
      <div className="App">
        <header className="App-header Half-screen">
          <h1>Área do cliente</h1>
          {st.user? <p>Bem vindo(a), <b>{st.user.name}</b></p>:null}
          <p>Acompanhe status das simualações</p>
          <p><Link to="/home" className="App-link">Tela inicial</Link></p>
          <p className="App-link" onClick={() => this.logout()}>
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
          st={st}
          searchCep={this.searchCep}
        />

        <Modal listenersId={["remove", "removeConfirm"]}>
          <form>
            <h3>Tem certeza que deseja excluir sua conta?</h3>
            <section>
            <p className="form-row">
              Seus dados serão removidos permanentemente do banco de dados.
            </p>
            <p className="form-row">
              Insira sua senha atual para confirmar.
            </p>
            <div className="form-row">
              <label>SENHA:</label>
              <input name="password" type="password" value={st.password} onChange={this.handlePassword}/>
            </div>
            </section>
          </form>
          <div className={st.password ? "Danger" : "Disabled"}>
            <button 
            id="removeConfirm" 
            type="button" 
            disabled={!st.password}
            onClick={() => this.confirmUser("delete")}>CONFIRMAR</button>
          </div>
        </Modal>

        <Modal listenersId={["update", "updateConfirm"]}>
          <form>
            <h3>Tem certeza que deseja alterar seus dados?</h3>
            <section>
            <p className="form-row">
              Seus dados serão alterados permanentemente do banco de dados.
            </p>
            <p className="form-row">
              Insira sua senha atual para confirmar.
            </p>
            <div className="form-row">
              <label>SENHA:</label>
              <input name="password" type="password" value={st.password} onChange={this.handlePassword}/>
            </div>
            </section>
          </form>
          <div className={st.password ? "Danger" : "Disabled"}>
            <button 
            id="updateConfirm" 
            type="button" 
            disabled={!st.password}
            onClick={() => this.confirmUser("update")}>CONFIRMAR</button>
          </div>
        </Modal>

      </div>
    )
  }
}

export default ClientInterface;