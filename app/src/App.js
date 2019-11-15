import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import NotFound from "./components/NotFound/NotFound";
import './App.css';

class App extends Component{
  componentDidMount(){
    /*let express = require('express')
    let cors = require('cors')
    let app = express()

    app.use(cors())*/
  }

  render(){
    return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Home}/>
        <Route exact path={"/home"} component={Home}/>
        <Route exact path={"/Checkout"} component={Form}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
  }
}

export default App;