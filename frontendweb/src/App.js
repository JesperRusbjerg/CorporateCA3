import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom"
import {DropdownButton, MenuItem, Button} from 'react-bootstrap'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import facade from './apiFacade'
import WelcomePage from './WelcomePage'
import Starwars from './StarWars'
import NavBar from './NavBar'
import RouterToOptions from './RouterToOptions'
import Largeinfo from './LargeInfo'
import Useredit from './UserEdit'

class App extends Component {
  render() {
    return (
      <Router>
        <div>

          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/Router" component={RouterToOptions} />
            <Route path="/starwars" component={Starwars} />
            <Route path="/largeinfo" component={Largeinfo} />
            <Route path="/useredit" component={Useredit} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </Router>
    );
  }
}





class Logout extends Component {
  constructor(props) {
    super(props)
    facade.logout();
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}




export default App;
