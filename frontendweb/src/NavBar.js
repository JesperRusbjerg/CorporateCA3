import React from 'react';
import { BrowserRouter as Router, NavLink } from "react-router-dom"
export default function NavBar(props) {
  var role = props.role
  
  if(role == null){
      return (
        <div>
          <ul className="header">
            <li style={{ float: "right" }}>
              <NavLink exact to="/">Login</NavLink>
            </li>
          </ul>
          <hr />
        </div>
      )
      }  
  
    else if (role === "user") {
      return (
        <div>
          <ul className="header">
            <li>
              <NavLink exact to="/Router">Info</NavLink>
            </li>
            <li>
              <NavLink exact to="/starwars">StarWars</NavLink>
            </li>
            <li>
              <NavLink exact to="/largeinfo">Large Info</NavLink>
            </li>
            <li style={{ float: "right" }}>
              <NavLink exact to="/logout">Log Out</NavLink>
            </li>
          </ul>
  
          <hr />
        </div>
      )
    }
  
    else if  (role === "admin"){
      return (
        <div>
          <ul className="header">
            <li>
              <NavLink exact to="/Router">Info</NavLink>
            </li>
            <li>
              <NavLink exact to="/starwars">StarWars</NavLink>
            </li>
            <li>
              <NavLink exact to="/largeinfo">Large Info</NavLink>
            </li>
            <li>
              <NavLink exact to="/useredit">User Edit</NavLink>
            </li>
            <li style={{ float: "right" }}>
              <NavLink exact to="/logout">Log Out</NavLink>
            </li>
          </ul>
  
          <hr />
        </div>
      )
    }else{
      return(
<div></div>
      );
    }
  }