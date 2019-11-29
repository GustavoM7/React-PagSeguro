import React from 'react';
import logo from '../logo.svg';
import {Link} from "react-router-dom"

const Home = () =>{
  return (
    <div className="App">
      <header className="App-header Full-screen">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <ul className="App-header-menu">
            <li><Link to="/authenticate" className="App-link">Simular login/cadastro</Link></li>
            <li><Link to="/cart" className="App-link">Simular carrinho</Link></li>
            <li><Link to="/checkout" className="App-link">Simular checkout</Link></li>
            <li><Link to="/notifications" className="App-link">Notifição de simulações</Link></li>
          </ul>
        </p>
      </header>
    </div>
  );
}

export default Home;