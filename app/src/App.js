import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Checkout from './components/Checkout/Checkout';
import Auth from './components/Auth/Auth';
import ClientInterface from './components/ClientInterface/ClientInterface';
import './App.css';

const App = () =>{
    return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Home}/>
        <Route exact path={"/home"} component={Home}/>
        <Route exact path={"/authenticate"} component={Auth}/>
        <Route exact path={"/cliente"} component={ClientInterface}/>
        <Route exact path={"/checkout"} component={Checkout}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;