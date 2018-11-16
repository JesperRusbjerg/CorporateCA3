import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom"
import { Form, FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import facade from './apiFacade'

class Register extends Component {
    constructor(props) {
      super(props);
      this.state = { register: { email: "", password: "" } }
    }
  
    handleSubmit = async (e) => {
      //Handle reg here
      var error = await facade.signUp(this.state.register.email, this.state.register.password)
      if(error === undefined){
      this.props.push('/Router');
      }else{
        console.log(error)
      }
  
    }
    handleChange = (e) => {
      const id = e.target.id
      const value = e.target.value
      this.state.register[id] = value
      this.setState({ register: this.state.register })
    }
    render() {
      return (
        <div>
          <h2>Register</h2>
          <Form horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Email
      </Col>
              <Col sm={10}>
                <FormControl type="email" id="email" value={this.state.register.email} placeholder="Enter password here" onChange={this.handleChange} />
              </Col>
            </FormGroup>
  
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Password
      </Col>
              <Col sm={10}>
                <FormControl type="password" id="password" value={this.state.register.password} placeholder="Enter password here" onChange={this.handleChange} />
              </Col>
            </FormGroup>
  
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" onClick={this.handleSubmit}>Register</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      );
    }
  }

  export default Register;