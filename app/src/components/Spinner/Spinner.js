import React from 'react';
import logo from './logo.png';
import './Style.css';

const NotFound = () =>{
  return (
    <div className="App">
      <header className="App-header Full-screen Spinner">
        <img className="Spinner" src={logo} alt="logo" />
      </header>
    </div>
  );
}

export default NotFound;