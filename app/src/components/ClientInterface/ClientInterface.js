import React, {Component} from "react";
import api from "../../service/Api";
import {Link} from "react-router-dom";
import Popup from "../Popup/Popup";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";
import {InfoIcon, SearchIcon} from "../Icons/Icons";

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
    console.log("Update será feito...")
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

        <Modal listenersId={["configButton", "remove"]}>
          <form>
            <h3>ATUALIZAR DADOS</h3>
            <section>
            <div className="form-row">
              <label>NOME:</label>
              <input name="name" value={st.userUpdate.name} onChange={this.handleInput}/>
            </div>

            <div className="form-row">
              <label>EMAIL:</label>
              <input name="email" type="email" value={st.userUpdate.email} onChange={this.handleInput}/>
            </div>

            <div className="form-row">
              <label>DDD:</label>
              <input className="short-input" name="phone_code" value={st.userUpdate.phone_code} onChange={this.handleInput}/>

              <label>TELEFONE:</label>
              <input name="phone" value={st.userUpdate.phone} onChange={this.handleInput}/>
            </div>

            <div onMouseLeave={() => this.setState({infoVisibility: false})}>
            <div className="form-row">
              <span onMouseOver={() => this.setState({infoVisibility: true})}>
                <InfoIcon/>
              </span>

              <label>CEP:</label>
              <input className="short-input" name="postal_code" value={st.userUpdate.postal_code} onChange={this.handleInput}/>

              <span onClick={() => this.searchCep()}>
                <SearchIcon />
              </span>
 
              <label>BAIRRO:</label>
              <input name="district" value={st.userUpdate.district} onChange={this.handleInput}/>
            </div>

            {st.infoVisibility ?
              <p className="form-row" onMouseOver={() => this.setState({infoVisibility: true})} onMouseOut={() => this.setState({infoVisibility: true})}>Pesquise um CEP válido para preencher seu endereço automaticamente. &nbsp; <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank" rel="noopener noreferrer"> Consulte seu CEP </a></p>
            :null
            }

            {st.cepErrorMsg ?
              <p className="form-row" style={{color:"#ff3232"}}>{st.cepErrorMsg}</p>
            :null
            }
            </div>
            
            <div className="form-row">
              <label>RUA:</label>
              <input name="street" value={st.userUpdate.street} onChange={this.handleInput}/>

              <label>NÚMERO:</label>
              <input className="short-input" name="number" value={st.userUpdate.number} onChange={this.handleInput}/>

              <label>COMPLEMENTO:</label>
              <input name="complement" value={st.userUpdate.complement} onChange={this.handleInput}/>
            </div>
            
            <div className="form-row">
              <label>CIDADE:</label>
              <input name="city" value={st.userUpdate.city} onChange={this.handleInput}/>

              <label>ESTADO:</label>
              <input name="state" value={st.userUpdate.state} onChange={this.handleInput}/>

              <label>PAÍS:</label>
              <input name="country" value={st.userUpdate.country} onChange={this.handleInput}/>
            </div>

            </section>
            <button id="update" type="button">SALVAR</button>

          </form>
          <hr/>
          <div className="Danger"><button id="remove" type="button">EXCLUIR CONTA</button></div>
        </Modal>

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
            id="removeConfirm" 
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