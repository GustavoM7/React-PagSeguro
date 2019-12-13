import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {

  //Estado manipula a visibilidade do modal
  state = {
    actived: this.props.actived,
  }

    //Alterna a visibilidade do modal
  change = () =>{
    this.setState({
      actived: this.state.actived ? false : true,
    })
  }

  render(){
    return(
      <div className="Modal-glass" style={{display: this.state.actived ? "flex" : "none"}}>
        <span className="Modal-closer" onClick={() => this.change()}>X</span>
        <div className="Modal-container"> {this.props.children} </div>
      </div>
    )
  }

  componentDidMount(){
    //Adicionando listenter para modal ser fechado ao pressionar esc
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27){
        if(this.state.actived)
          this.change();
        }
    })

    //Lista de ids passada por props
    //Cada elemento de id passado terá responsabilidade de abrir ou fechar modal
    let listenersList = this.props.listenersId

    if(listenersList){
      listenersList.forEach((id) => {
        let element = document.getElementById(id);
        if(element){
          element.addEventListener("click", () =>{
            this.change();
          }) 
        }
            
      })
    }
  }
}

export default Modal;