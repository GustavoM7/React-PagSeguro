import React, {Component} from "react";
import Produtos from "../../service/Dados";
import callPagSeguro from "../../service/PagSeguro";

class Form extends Component{
    state = {
      carrinho: [],

      //Dados do comprador:
      name: "Teste",
      email: "teste@sandbox.pagseguro.com.br",
      phoneAreaCode: "51",
      phoneNumber: "00000000",

      //Dados do frete:
      type: 1,
      street: "Rua teste",
      number: "000",
      complement: "Complemento teste",
      district: "Bairro teste",
      postalCode: "00000-00",
      city: "Cidade teste",
      state: "Estado teste",
      country: "País teste",

    }

    handleInput = (e) =>{
      this.setState({
          [e.target.name]: e.target.value
      })
    }

    submit = async() => {
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
          let comprador = {
            name: st.name,
            email: st.email,
            phoneAreaCode: st.phoneAreaCode,
            phoneNumber: st.phoneNumber,
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

          let res = await callPagSeguro(this.state.carrinho, comprador, frete);
          console.log(res);
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
              <p>Preencha abaixo para simular uma compra com PagSeguro</p>
          </header>
          <form>
            <h3>Dados do comprador</h3>
            <label>Nome:</label>
            <input name="name" value={this.state.name} onChange={this.handleInput}/>

            <label>Email:</label>
            <input name="email" value={this.state.email} onChange={this.handleInput}/>

            <label>DDD:</label>
            <input name="phoneAreaCode" value={this.state.phoneAreaCode} onChange={this.handleInput}/>

            <label>Telefone:</label>
            <input name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInput}/>

            <hr/>

            <h3>Dados do frete</h3>
            <label>Rua:</label>
            <input name="street" value={this.state.street} onChange={this.handleInput}/>

            <label>Número:</label>
            <input name="number" value={this.state.number} onChange={this.handleInput}/>

            <label>Complemento:</label>
            <input name="complement" value={this.state.complement} onChange={this.handleInput}/>

            <label>Bairro:</label>
            <input name="district" value={this.state.district} onChange={this.handleInput}/>

            <label>CEP:</label>
            <input name="postalCode" value={this.state.postalCode} onChange={this.handleInput}/>

            <label>Cidade:</label>
            <input name="city" value={this.state.city} onChange={this.handleInput}/>

            <label>Estado:</label>
            <input name="state" value={this.state.state} onChange={this.handleInput}/>

            <label>País:</label>
            <input name="country" value={this.state.country} onChange={this.handleInput}/>

            <button type="button" onClick={() => this.submit()}>confirmar</button>

          </form>
        </div>
      );
    }
}

export default Form;