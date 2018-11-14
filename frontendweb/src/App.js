import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom"
import { Form, FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap'
import './index.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';





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


function NavBar(props) {
  if (props.loggedIn === "false") {
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

  else if (props.user.role === "user") {
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

  else if (props.user.role === "admin") {
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
  }
}




class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { login: true }
  }

  swapState = () => {
    this.setState({ login: !this.state.login })
  }

  render() {
    if (this.state.login) {
      return (
        <div>
          <NavBar loggedIn="false" />
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
          <NavBar loggedIn="false" />
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


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { login: { email: "", password: "" } }
  }

  handleSubmit = (e) => {

    //Handle login here

    this.props.push('/Router');

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

    return (
      <div>

        <h2>Login</h2>
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { register: { email: "", password: "" } }
  }

  handleSubmit = (e) => {
    //Handle reg here
    this.props.push('/Router');

  }
  handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    this.state.register[id] = value
    this.setState({ login: this.state.login })
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

function Starwars() {
  const labels = ["Name", "Height", "Mass", "Hair color", "Skin color", "Eye color", "Birth Year", "Gender"]
  var user = {
    "email": "hej",
    "role": "admin"
  }

  var users = [
    {Name: "Perlt", Height: "167cm", Mass: "24", "Hair color": "Blond", "Skin color": "Black", "Eye color": "Blue", "Birth Year": "1998", Gender: "Male"}
  ]

  function columns(label) {
    const columns = label.map((label) => {
      const newCol = {
        dataField: label,
        text: label,
      }
      return newCol;
    });
    return columns;
  }

  return (
    <div>
      <NavBar user={user} />
      <h1> star wars page</h1>

      <BootstrapTable
        striped
        hover
        bootstrap4
        keyField='Name'
        data={users}
        columns={columns(labels)}


      />

    </div>
  );
}

function Largeinfo() {
  var user = {
    "email": "hej",
    "role": "admin"
  }
  return (
    <div>
      <NavBar user={user} />
      <h1> large info page</h1>
    </div>
  );
}

function Useredit(props) {
  var user = {
    "email": "hej",
    "role": "admin"
  }
  return (
    <div>
      <NavBar user={user} />
      <h1> user edit page</h1>
    </div>
  );
}


//fix this class
class Logout extends Component {
  constructor(props) {
    super(props)
    this.props.history.push('/');
  }
  handleClick = () => {
    console.log("hej")

  }
  render() {
    console.log("render comes here")
    return (
      <div>
        <NavBar />
        <h1> this page needs to remove user from session storage and send back to login page after</h1>

        <Button bsStyle="info" onClick={this.handleClick}>
          Logout
      </Button>
      </div>
    );
  }
}

function RouterToOptions() {
  var user = {
    "email": "hej",
    "role": "admin"
  }
  return (
    <div>
      <NavBar user={user} />
      <h1>welcome to the info page, what kinda info should we have here i wonder </h1>

      <h4> for sure i need to delete these buttons atleast </h4>

    </div>
  );
}

export default App;
