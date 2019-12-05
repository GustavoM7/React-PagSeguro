import React, {Component} from "react";
import {Link} from "react-router-dom";
import api from "../../service/Api";
import Popup from "../Popup/Popup";

class Auth extends Component{
  state = {
    loginForm: true, //Indica qual formulário deve ser mostrado

    //dados de cadastro
    name: "",
    email: "",
    phoneAreaCode: "",
    phoneNumber: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    password: "",
    passwordConfirm: "",

    //dados de login
    loginEmail: "",
    loginPassword: "",

    //Estados de msg
    popText: "",
    popWarning: false,
    popVisibility: false,
    popPermanent: false,
  }

  changeForms = () =>{
    this.setState({loginForm: this.state.loginForm ? false : true});
  }

  handleInput = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
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

  login = () =>{
    let st = this.state;
    if(st.loginPassword && st.loginEmail){
      this.callPopup("Realizado login...", false, true, true);
    } else this.callPopup("Preencha todos os campos!", true, true, false);
  }

  submit = () =>{
    let st = this.state;
    if(st.name && st.email && st.password && st.passwordConfirm){
      if(st.password !== st.passwordConfirm){
        this.callPopup("Senhas não coincidem...", true, true, false);
      } else {
        let newUser = {
          name: st.name,
          email: st.email,
          phone_code: st.phoneAreaCode,
          phone: st.phoneNumber,
          street: st.street,
          number: st.number,
          complement: st.complement,
          district: st.district,
          postal_code: st.postalCode,
          city: st.city,
          state: st.state,
          country: st.country,
          password: st.password,
        };

        this.callPopup("Cadastrando dados...", false, true, true);
        api.post('/Users', newUser).then(res => {
          console.log(res);
          this.callPopup("Novo cliente cadastrado!", false, true, false);
          this.setState({
            name: "",
            email: "",
            phoneAreaCode: "",
            phoneNumber: "",
            street: "",
            number: "",
            complement: "",
            district: "",
            postalCode: "",
            city: "",
            state: "",
            country: "",
            password: "",
            passwordConfirm: "",        
          })
        }).catch(e => {
          alert("Erro inesperado...");
          console.log(e);
        })
      }
      
    }
    else this.callPopup("Preencha todos os campos obrigatórios!", true, true, false);;
  }

  render(){
    let st = this.state;

    return(
    <div className="App">
      <header className="App-header Half-screen">
        <h1>Simulação de autenticação</h1>
        <p>Realize login ou cadastre um cliente para efeito de simulação</p>
        <p><Link to="/home" className="App-link">Tela inicial</Link></p>
        <p className="App-link" onClick={() => this.changeForms()}>
            {st.loginForm ? "Cadastrar cliente" : "Login"}
        </p>
      </header>
      {st.loginForm ? 
        <FormLogin state={st} handleInput={this.handleInput} login={this.login} /> 
        : <FormNewUser state={st} handleInput={this.handleInput} submit={this.submit} /> }
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

export default Auth;

const FormNewUser = (props) =>{
  return(
    <form>
      <h3>CADASTRAR NOVO CLIENTE</h3>
        <section>
        <div className="form-row">
          <label>NOME<em>*</em>:</label>
          <input name="name" value={props.state.name} onChange={props.handleInput}/>
        </div>

        <div className="form-row">
          <label>DDD:</label>
          <input className="short-input" name="phoneAreaCode" value={props.state.phoneAreaCode} onChange={props.handleInput}/>
          <label>TELEFONE:</label>
          <input name="phoneNumber" value={props.state.phoneNumber} onChange={props.handleInput}/>
        </div>

        <div className="form-row">
          <label>RUA:</label>
          <input name="street" value={props.state.street} onChange={props.handleInput}/>

          <label>NÚMERO:</label>
          <input className="short-input" name="number" type="number" value={props.state.number} onChange={props.handleInput}/>

          <label>COMPLEMENTO:</label>
          <input name="complement" value={props.state.complement} onChange={props.handleInput}/>
        </div>

        <div className="form-row">
          <label>BAIRRO:</label>
          <input name="district" value={props.state.district} onChange={props.handleInput}/>

          <label>CEP:</label>
          <input className="short-input" name="postalCode" value={props.state.postalCode} onChange={props.handleInput}/>
        </div>
            
        <div className="form-row">
          <label>CIDADE:</label>
          <input name="city" value={props.state.city} onChange={props.handleInput}/>

          <label>ESTADO:</label>
          <input name="state" value={props.state.state} onChange={props.handleInput}/>

          <label>PAÍS:</label>
          <input name="country" value={props.state.country} onChange={props.handleInput}/>
        </div>

        <div className="form-row">
          <label>EMAIL<em>*</em>:</label>
          <input name="email" type="email" value={props.state.email} onChange={props.handleInput}/>
        </div>

        <div className="form-row">
          <label>SENHA<em>*</em>:</label>
          <input name="password" type="password" value={props.state.password} onChange={props.handleInput}/>
          <label>CONFIRMAR SENHA<em>*</em>:</label>
          <input name="passwordConfirm" type="password" value={props.state.passwordConfirm} onChange={props.handleInput}/>
        </div>

        </section>
        <em>* Obrigatórios</em>
        <button type="button" onClick={() => props.submit()}>ENVIAR</button>
    </form>
  )
}

const FormLogin = (props) =>{
  return(
    <form>
      <h3>REALIZAR LOGIN</h3>
      <section>
        <div className="form-row">
          <label>EMAIL:</label>
          <input name="loginEmail" type="email" value={props.state.loginEmail} onChange={props.handleInput}/>
        </div>
        <div className="form-row">
          <label>SENHA:</label>
          <input name="loginPassword" type="password" value={props.state.loginPassword} onChange={props.handleInput}/>
        </div>
      </section>

      <button type="button" onClick={() => props.login()}>ENTRAR</button>
    </form>
  )
}