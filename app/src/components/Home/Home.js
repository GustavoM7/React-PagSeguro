import React from 'react';
import logo from '../logo.svg';
import {Link} from "react-router-dom"

const Home = () =>{
  return (
    <div className="App">
      <header className="App-header Full-screen">
        <img src={logo} className="App-logo" alt="logo" />
        <ul className="App-header-menu">
          <li><Link to="/authenticate" className="App-link">Área do cliente</Link></li>
          <li><Link to="/cart" className="App-link">Simular carrinho</Link></li>
          <li><Link to="/checkout" className="App-link">Simular checkout</Link></li>
        </ul>
      </header>
    </div>
  );
}

export default Home;