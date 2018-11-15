const URL = "https://www.corporategroup.dk/CA3"

function jwtDecode(t) {
  let token = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split('.')[0]));
  token.payload = JSON.parse(window.atob(t.split('.')[1]));
  return (token)
}

async function handleHttpErrors(res) {
  if (!res.ok) {
    const fullError = await res.json();
   throw {status: res.status, fullError};
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

    var decoded = jwtDecode(token)
    localStorage.setItem('email', decoded.payload.email)
    localStorage.setItem('role', decoded.payload.roles)
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
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  }

  login = async (email, pass) => {
    const options = this.makeOptions("POST", true, { email: email, password: pass })
   try{ 
    const res = await fetch(URL + "/api/login", options, true)
    const json = await (handleHttpErrors(res))
    this.setToken(json.token)
   }catch(e){
     return e;
   }
    }

  signUp = (pass, email) => {
    const options = this.makeOptions("POST", true, { password: pass, email: email })
    fetch(URL + "api/login/create", options, true)
      .then(handleHttpErrors)
      .then(res => { this.setToken(res.token) })
  }

  //Returns promise - Contains array of StarWars characters
  starWarsFetch = async (amount) => {
    const options = this.makeOptions("GET", true)
    return await fetch(URL + `/api/swapi?amount=${amount}`, options, true).then(handleHttpErrors)
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