import React, { Component } from 'react';
import { BrowserRouter as Router} from "react-router-dom"
import {FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import NavBar from './NavBar'
import facade from './apiFacade'

export default class Starwars extends Component {
    constructor(){
      super();
      const labels = ["Name",  "Hair color", "Eye color", "Birth Year", "Gender"]
      var users = [
      {Name: "Perlt", Height: "167cm", Mass: "24", "Hair color": "Blond", "Skin color": "Black", "Eye color": "Blue", "Birth Year": "1998", Gender: "Male"}
    ]
      this.state = {amount: 0, labels: labels, users: users}
    }
    
    dataConverter = (starwarriors) =>{
      const users = starwarriors.map((obj) =>{
        const member = {
        Name: obj.name,
       //  Height: obj.height,
        //  Mass: obj.mass,
           "Hair color": obj.hair_color,
           // "Skin color": obj.skin_color,
             "Eye color": obj.eye_color,
              "Birth Year": obj.birth_year,
               Gender: obj.gender}
        
          return member;
      });
      return users;
    }
  
     columns = (label) =>{
      const columns = label.map((label) => {
        const newCol = {
          dataField: label,
          text: label,
        }
        return newCol;
      });
      return columns;
    }
  
    handleChange = (e) =>{
      this.setState({amount: e.target.value})
    }
  
    handleSubmit = async (e) =>{
      e.preventDefault();
      const starwarriors = await facade.starWarsFetch(this.state.amount)
      const users = this.dataConverter(starwarriors)
      this.setState({users: users})
  
    }
   
  render(){
    var roleNavBar = localStorage.getItem("role")
  
    return (
      <div>
        <NavBar role={roleNavBar} />
        <h1> star wars page</h1>
  
      <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
               Fetch amount of starwars
         </Col>
              <Col sm={10}>
                <FormControl type="number" value={this.state.amount} onChange={this.handleChange} />
              </Col>
            </FormGroup>
  
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="danger" onClick={this.handleSubmit}>Fetch StarWarriors!</Button>
              </Col>
            </FormGroup>
  
        <BootstrapTable
          striped
          hover
          bootstrap4
          keyField='Name'
          data={this.state.users}
          columns={this.columns(this.state.labels)}
        />
  
      </div>
    );
  }}