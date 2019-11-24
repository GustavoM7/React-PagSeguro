import React from 'react';
import logo from '../logo.svg';
import {Link} from "react-router-dom";

const Home = () =>{
  return (
    <div className="App">
      <header className="App-header Full-screen">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Página não encontrada... :C</p>
        <Link to="/home" className="App-link">Tela inicial</Link>
      </header>
    </div>
  );
}

export default Home;