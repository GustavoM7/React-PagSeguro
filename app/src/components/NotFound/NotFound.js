import React from 'react';
import {ReactLogo} from '../Icons/Icons';
import {Link} from "react-router-dom";

const NotFound = () =>{
  return (
    <div className="App">
      <header className="App-header Full-screen">
        <ReactLogo/>
        <p>Página não encontrada... :C</p>
        <Link to="/home" className="App-link">Tela inicial</Link>
      </header>
    </div>
  );
}

export default NotFound;