import React from 'react';
import {ReactLogo} from '../Icons/Icons';
import {Link} from "react-router-dom"

const Home = () =>{
  return (
    <div className="App">
      <header className="App-header Full-screen">
        <ReactLogo/>
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