import React, {Component} from "react";
import {Link} from "react-router-dom";

class Auth extends Component{
  state = {
    loginForm: true,
  }

  changeForrms = () =>{
    this.setState({loginForm: this.state.loginForm ? false : true});
  }

  handleInput = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = () =>{
    console.log("Login...")
  }

  submit = () =>{
    console.log("cadastrando...")
  }

  render(){
    const loginForm = this.state.loginForm;

    return(
    <div className="App">
      <header className="App-header Half-screen">
        <h1>Simulação de autenticação</h1>
        <p>Realize login ou cadastre um cliente para efeito de simulação</p>
        <p><Link to="/home" className="App-link">Tela inicial</Link></p>
        <p className="App-link" onClick={() => this.changeForrms()}>
            {loginForm ? "Cadastrar cliente" : "Login"}
        </p>
      </header>
      {loginForm ? 
        <FormLogin state={this.state} handleInput={this.handleInput} login={this.login} /> 
        : <FormNewUser state={this.state} handleInput={this.handleInput} submit={this.submit} /> }
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
          <label>DDD:</label>
          <input className="short-input" name="phoneAreaCode" value={props.state.phoneAreaCode} onChange={props.handleInput}/>
          <label>TELEFONE:</label>
          <input name="phoneNumber" value={props.state.phoneNumber} onChange={props.handleInput}/>
        </div>

        <div className="form-row">
          <label>RUA:</label>
          <input name="street" value={props.state.street} onChange={props.handleInput}/>

          <label>NÚMERO:</label>
          <input className="short-input" name="number" value={props.state.number} onChange={props.handleInput}/>

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
          <label>EMAIL:</label>
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
          <input name="name" type="email" value={props.state.email} onChange={props.handleInput}/>
        </div>
        <div className="form-row">
          <label>SENHA:</label>
          <input name="name" type="password" value={props.state.email} onChange={props.handleInput}/>
        </div>
      </section>

      <button type="button" onClick={() => props.login()}>ENTRAR</button>
    </form>
  )
}