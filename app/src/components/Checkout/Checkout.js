import React, {Component} from "react";
import Produtos from "../../service/Dados";
import api from "../../service/Api";
import {Link} from "react-router-dom";

class Checkout extends Component{
    state = {
      carrinho: [],

      //Dados do comprador:
      name: "Gustavo Marques",
      email: "c13823858083569199133@sandbox.pagseguro.com.br",
      phoneAreaCode: "51",
      phoneNumber: "88888888",

      //Dados do frete:
      type: 1,
      street: "Rua teste",
      number: "41",
      complement: "Complemento teste",
      district: "Bairro teste",
      postalCode: "01452002",
      city: "São Paulo",
      state: "SP",
      country: "BRA",
    }

    handleInput = (e) =>{
      this.setState({
          [e.target.name]: e.target.value
      })
    }

    submit = () => {
      const st = this.state;

      if(st.carrinho.length === 0) alert("O Carrinho está vazio...");
      else if(st.name &&
        st.email &&
        st.phoneAreaCode &&
        st.phoneNumber &&
        st.street &&
        st.number &&
        st.district &&
        st.postalCode &&
        st.city &&
        st.state &&
        st.country){

          let ref = Math.random() * 10000;

          let comprador = {
            name: st.name,
            email: st.email,
            phoneAreaCode: st.phoneAreaCode,
            phoneNumber: st.phoneNumber,
            ref: ref,
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

          console.log("processando...")

          let req = {carrinho: Produtos, comprador: comprador, frete: frete};

          api.post("/pagseguro", req).then((res) => {
            console.log(res.data);
            let redirectKey = res.data.checkout.code._text;
            alert("Você será redirecionado para finalizar o pagamento!");
            window.location.href = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code='+redirectKey;
          }).catch((e) => {console.log(e)});
        }

        else alert("Preencha todos os dados!");
    }

    componentDidMount(){
      this.setState({carrinho: Produtos});
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
        </div>
      );
    }
}

export default Checkout;