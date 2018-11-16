import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom"
import { Form, FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import facade from './apiFacade'

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { login: { email: "user@gmail.com", password: "test" }, loginError: '' }
    }
  
    handleSubmit = async (e) => {
  
      //Handle login here
  
      var err = await facade.login(this.state.login.email, this.state.login.password)
     
      if(err === undefined){
      this.props.push('/Router');
      }else{
        this.setState({loginError: err.fullError.errorMessage})
      }
    
    }
  
    handleChange = (e) => {
      const id = e.target.id
      const value = e.target.value
      this.state.login[id] = value
      this.setState({ login: this.state.login })
      console.log(this.state.login)
      // console.log(this.state.email)
    }
  
    render() {
      console.log(this.state.loginError)
      return (
        <div>
  
          <h2>Login</h2>
  
          <p style={{color: 'red'}}>{this.state.loginError}</p>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Email
      </Col>
              <Col sm={10}>
                <FormControl type="email" id="email" value={this.state.login.email} placeholder="Enter password here" onChange={this.handleChange} />
              </Col>
            </FormGroup>
  
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Password
      </Col>
              <Col sm={10}>
                <FormControl type="password" id="password" value={this.state.login.password} placeholder="Enter password here" onChange={this.handleChange} />
              </Col>
            </FormGroup>
  
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" onClick={this.handleSubmit}>Sign in</Button>
              </Col>
            </FormGroup>
          </Form>
  
        </div>
      );
    }
  }

export default Login;  