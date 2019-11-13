import React, {Component} from "react";

class Form extends Component{
    state = {}

    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
      return(
        <div className="App">
          <header className="App-header">
              Formulário de Checkout
          </header>
          <form>

          </form>
        </div>
      );
    }
}

export default Form;