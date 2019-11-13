import React from 'react';
import logo from '../logo.svg';
import {Link} from "react-router-dom"

const Home = () =>{
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            <Link to="/checkout" className="App-link">Click aqui para fazer um teste</Link>
        </p>
      </header>
    </div>
  );
}

export default Home;