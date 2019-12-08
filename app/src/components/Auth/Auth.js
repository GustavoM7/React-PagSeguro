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
    emailConfirm: "",
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

  verifyEmail = (emailString) => {
    const userString = emailString.substring(0, emailString.indexOf("@"));
    const dom = emailString.substring(emailString.indexOf("@")+ 1, emailString.length);

    if ((userString.length >=1) && (dom.length >=3) && (userString.search("@")===-1) && (dom.search("@")===-1) && (userString.search(" ")===-1) && (dom.search(" ")===-1) && (dom.search(".")!==-1) &&(dom.indexOf(".") >=1) && (dom.lastIndexOf(".") < dom.length - 1)) {
      return true;
    } else return false;
  }

  login = () =>{
    const user = {
      email: this.state.loginEmail,
      password: this.state.loginPassword,
    };

    if(user.email && user.password){
      if(!this.verifyEmail(user.email)) this.callPopup("Formato de email incorreto!", true, true, false);

      else {
        this.callPopup("Verificando dados...", false, true, true);
        api.post('/Users/Login', user).then(res => {
          if(res.data.code === 404){
            this.callPopup("Email não encontrado!", true, true, false);

          } else if(res.data.code === 409){
            this.callPopup("Senha incorreta!", true, true, false);

          } else {
            this.callPopup("Realizando login...", false, true, true);
            localStorage.setItem('@reactpagseguro/logintoken', res.data.token);
            window.location.replace('/Cliente');

          }
        }).catch(e => {
          console.log(e);
          this.callPopup("Erro... Tente mais tarde!", true, true, false);

        });
      }

    } else this.callPopup("Preencha todos os campos!", true, true, false);
  }

  authenticate = (token) =>{
    api.post('/Users/Authenticate', {headers: {"Authorization" : token}}).then(res => {
      if(res.error) this.callPopup("Autenticação expirtada...", true, true, false);
      else this.callPopup("Autenticado!", false, true, false);
      
    }).catch(e => {
      this.callPopup("Erro... Tente novamente mais tarde.", true, true, false);
      console.log(e);

    }) 
  }

  submit = () =>{
    let st = this.state;
    if(st.name && st.email && st.password && st.passwordConfirm && st.emailConfirm){
      if(!this.verifyEmail(st.email)) this.callPopup("Formato de email incorreto!", true, true, false);

      else if(st.password.length < 6) this.callPopup("A senha deve ter no mínimo 6 caracteres!", true, true, false);

      else if(st.email !== st.emailConfirm) this.callPopup("Emails não coincidem...", true, true, false);

      else if(st.password !== st.passwordConfirm) this.callPopup("Senhas não coincidem...", true, true, false);

      else {
        let newUser = {
          name: st.name,
          email: st.email,
          password: st.password,
        };

        this.callPopup("Verificando dados...", false, true, true);
        api.post('/Users', newUser).then(res => {
          console.log(res);
          if(res.data.code === 200){
            this.callPopup("Novo cliente cadastrado!", false, true, false);
            this.setState({
              name: "",
              email: "",
              emailConfirm: "",
              password: "",
              passwordConfirm: "",        
            });

          } else if(res.data.code === 409){
            this.callPopup("Este email já está cadastrado!", true, true, false);

          }
        }).catch(e => {
          this.callPopup("Erro... Tente mais tarde!", true, true, false);
          console.log(e);

        })
      }
      
    }
    else this.callPopup("Preencha todos os campos obrigatórios!", true, true, false);;
  }

  componentDidMount(){
    const loginToken = localStorage.getItem('@reactpagseguro/logintoken');
    if(loginToken) window.location.replace('/Cliente');
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
          <label>NOME:</label>
          <input name="name" value={props.state.name} onChange={props.handleInput}/>
        </div>

        <div className="form-row">
          <label>EMAIL:</label>
          <input name="emailConfirm" type="email" value={props.state.emailConfirm} onChange={props.handleInput}/>
          <label>CONFITMAR EMAIL:</label>
          <input name="email" type="email" value={props.state.email} onChange={props.handleInput}/>
        </div>

        <div className="form-row">
          <label>SENHA:</label>
          <input name="password" type="password" value={props.state.password} onChange={props.handleInput}/>
          <label>CONFIRMAR SENHA:</label>
          <input name="passwordConfirm" type="password" value={props.state.passwordConfirm} onChange={props.handleInput}/>
        </div>

        </section>
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