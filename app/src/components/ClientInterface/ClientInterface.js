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
  }

  handleInput = (e) =>{
    this.setState({
      userUpdate: {[e.target.name]: e.target.value},
    })
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

        <Modal listenersId={["configButton"]}>
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
            <button type="button">SALVAR</button>

          </form>
          <hr/>
          <div className="Danger"><button type="button">EXCLUIR CONTA</button></div>
        </Modal>

      </div>
    )
  }
}

export default ClientInterface;