import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import { Button } from 'react-bootstrap'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import NavBar from './NavBar'
import Register from './Register'
import Login from './Login'


class WelcomePage extends Component {
    constructor(props) {
      super(props);
      this.state = { login: true }
     
    }
  
    swapState = () => {
      this.setState({ login: !this.state.login })
    }
  
    render() {
      var roleNavBar = localStorage.getItem("role")
      if (this.state.login) {
        return (
          <div>
            <NavBar role={roleNavBar} />
            <h1>Hello and welcome to the starwars web app</h1>
            <Login push={this.props.history.push} />
            <Button bsStyle="info" onClick={this.swapState}>
              Register
           </Button>
          </div>
        );
      }
      else {
        return (
          <div>
            <NavBar role={roleNavBar} />
            <h1>Hello and welcome to the starwars web app</h1>
            <Register push={this.props.history.push} />
            <Button bsStyle="info" onClick={this.swapState}>
              Login
           </Button>
          </div>
        );
      }
    }
  }
export default WelcomePage;  