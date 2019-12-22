import React, {Component} from "react";
import Produtos from "../../service/Dados";
import api from "../../service/Api";
import {Link} from "react-router-dom";
import Popup from '../Popup/Popup';
import { connect } from "react-redux";
import { setUser } from "../../store/actions/user";
import authenticate from '../../service/authenticate';

class Checkout extends Component{
  state = {
    carrinho: [],

    //Dados do comprador:
    name: "",
    email: "",
    phoneAreaCode: "",
    phoneNumber: "",

    //Dados do frete:
    type: 1,
    street: "",
    number: "",
    complement: "",
    district: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    ref: Math.random() * 10000,

    //Popup para retornos
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

  handleInput = (e) =>{
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  submit = () => {
    const st = this.state;

    if(st.carrinho.length === 0) this.callPopup("O Carrinho está vazio...", true, true, false);
    else if(st.name && st.email && st.phoneAreaCode && st.phoneNumber && st.street && st.number &&st.district && st.postalCode && st.city && st.state && st.country){

      let comprador = {
        name: st.name,
        email: st.email,
        phoneAreaCode: st.phoneAreaCode,
        phoneNumber: st.phoneNumber,
        ref: st.ref,
      }

      let frete = {
        type: 1,
        street: st.street,
        number: st.number,
        complement: st.complement,
        district: st.district,
        postalCode: st.postalCode,
        city: st.city,
        state: st.state,
        country: st.country,
      }

      this.callPopup("Processando dados...", false, true, true);

      let req = {carrinho: Produtos, comprador: comprador, frete: frete};

      api.post("/pagseguro", req).then((res) => {
        this.callPopup("Redirecionando...", false, true, true);
        let redirectKey = res.data.checkout.code._text;
        window.location.href = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code='+redirectKey;

      }).catch((e) => {
        console.log(e);
        this.callPopup("Erro inesperado!", true, true, false);

      });
    }

    else this.callPopup("Preencha todos os dados!", true, true, false);
  }

  getUser = (user) => {
    this.setState({
      name: user.name,
      email: user.email,
      phoneAreaCode: user.phone_code,
      phoneNumber: user.phone,
      type: 1,
      street: user.street,
      number: user.number,
      complement: user.complement,
      district: user.district,
      postalCode: user.postal_code,
      city: user.city,
      state: user.state,
      country: user.country,
      ref: user.id
    });
  }

  componentDidMount(){
    this.setState({carrinho: Produtos});

    const loginToken = localStorage.getItem('@reactpagseguro/logintoken');
    
    if(this.props.state.user.id){
      const user = this.props.state.user;
      this.callPopup("Autenticado!", false, true, false);
      this.getUser(user);

    } else if(loginToken) {
      authenticate(loginToken, (res)=> {
      this.props.setUser(res.data);
      this.getUser(res.data);
      this.callPopup("Autenticado!", false, true, false);
      this.setState({userUpdate: res.data, loaded: true});
  
      }, console.log("Autenticação expirtada..."));
      
    }
  }

  render(){
    return(
      <div className="App">
        <header className="App-header Half-screen">
            <h1>FORMULÁRIO DE CHECKOUT</h1>
            <p>Preencha abaixo para simular uma compra com <em>PagSeguro</em></p>
            <Link to="/home" className="App-link">Tela inicial</Link>
        </header>
        <form>
          <h3>DADOS DO COMPRADOR</h3>
          <section>
          <div className="form-row">
            <label>NOME:</label>
            <input name="name" value={this.state.name} onChange={this.handleInput}/>
          </div>

          <div className="form-row">
            <label>EMAIL:</label>
            <input name="email" value={this.state.email} onChange={this.handleInput}/>
          </div>

          <div className="form-row">
            <label>DDD:</label>
            <input className="short-input" name="phoneAreaCode" value={this.state.phoneAreaCode} onChange={this.handleInput}/>

            <label>TELEFONE:</label>
            <input name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInput}/>
          </div>
          </section>

          <hr/>

          <h3>DADOS DO FRETE</h3>
          <section>
          <div className="form-row">
            <label>RUA:</label>
            <input name="street" value={this.state.street} onChange={this.handleInput}/>

            <label>NÚMERO:</label>
            <input className="short-input" name="number" value={this.state.number} onChange={this.handleInput}/>

            <label>COMPLEMENTO:</label>
            <input name="complement" value={this.state.complement} onChange={this.handleInput}/>
          </div>

          <div className="form-row">
            <label>BAIRRO:</label>
            <input name="district" value={this.state.district} onChange={this.handleInput}/>

            <label>CEP:</label>
            <input className="short-input" name="postalCode" value={this.state.postalCode} onChange={this.handleInput}/>
          </div>
          
          <div className="form-row">
            <label>CIDADE:</label>
            <input name="city" value={this.state.city} onChange={this.handleInput}/>

            <label>ESTADO:</label>
            <input name="state" value={this.state.state} onChange={this.handleInput}/>

            <label>PAÍS:</label>
            <input name="country" value={this.state.country} onChange={this.handleInput}/>
          </div>

          </section>
          <hr/>
          <button type="button" onClick={() => this.submit()}>CONFIRMAR</button>

        </form>
        <Popup 
          warning={this.state.popWarning}
          visible={this.state.popVisibility}
          permanent={this.state.popPermanent}
          onClose={this.closePopup}>
          {this.state.popText}
        </Popup>
      </div>
    );
  }
}

export default connect(state => ({state: state.user}), { setUser })(Checkout);