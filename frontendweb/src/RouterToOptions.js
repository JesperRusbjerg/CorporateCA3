import React, { Component } from 'react';
import NavBar from './NavBar'
export default function RouterToOptions() {
  
    var roleNavBar = localStorage.getItem("role")
  
    return (
      <div>
        <NavBar role={roleNavBar} />
        <h1>Welcome to the info page</h1>

        <h3>From this page you can route to our diffrent, awesome options! </h3>
  
       
  
      </div>
    );
  }
  