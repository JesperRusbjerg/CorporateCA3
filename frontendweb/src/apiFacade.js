const URL = ""

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

class ApiFacade {
  makeOptions(method, addToken, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && this.loggedIn()) {
      opts.headers["x-access-token"] = this.getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

  setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }

  getToken = () => {
    return localStorage.getItem('jwtToken')
  }

  loggedIn = () => {
    const loggedIn = this.getToken() != null;
    return loggedIn;
  }

  logout = () => {
    localStorage.removeItem("jwtToken");
  }

  login = (email, pass) => {
    const options = this.makeOptions("POST", true, { email: email, password: pass })
    fetch(URL + "/api/login", options, true)
      .then(handleHttpErrors)
      .then(res => { this.setToken(res.token) })
  }

  signUp = (pass, email) => {
    const options = this.makeOptions("POST", true, { password: pass, email: email })
    fetch(URL + "api/login/create", options, true)
      .then(handleHttpErrors)
      .then(res => { this.setToken(res.token) })
  }

  //Returns promise - Contains array of StarWars characters
  starWarsFetch = (amount) => {
    const options = this.makeOptions("GET", true, { amount: amount })
    return fetch(URL + "api/swapi", options, true).then(handleHttpErrors)
  }

  //Returns promise - Contains array of all users
  getUsers = () => {
    const options = this.makeOptions("GET", true)
    return fetch(URL + "/api/users", options, true).then(handleHttpErrors)
  }

  //Returns promise - Contains edited user {email and role}
  editUser = (id) => {
    const options = this.makeOptions("PUT", true)
    return fetch(URL + `/api/users/${id}`, options, true).then(handleHttpErrors)
  }

  //Returns promise - Contains array of all roles
  getRoles = () => {
    const options = this.makeOptions("GET", true)
    return fetch(URL + "/api/roles", options, true).then(handleHttpErrors)
  }

  //Returns promise - Contains array of dummyData
  getDummyData = (amount) => {
    const options = this.makeOptions("GET", true)
    return fetch(URL + `/api/dummyData/${amount}`, options, true).then(handleHttpErrors)
  }
}
const facade = new ApiFacade();
export default facade;