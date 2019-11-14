import React, {Component} from "react";

class Form extends Component{
    state = {
      carrinho: [],

      //Dados do comprador:
      name: "Teste",
      email: "teste@teste.com",
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

          </form>
        </div>
      );
    }
}

export default Form;