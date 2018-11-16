const URL = "https://www.adamlass.com/CA3"

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
    throw { status: res.status, fullError };
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
    console.log(decoded.payload.roles)
    if (decoded.payload.roles.includes("admin")) {
      localStorage.setItem('role', 'admin')
    } else {
      localStorage.setItem('role', decoded.payload.roles)
    }
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
    try {
      const res = await fetch(URL + "/api/login", options, true)
      const json = await (handleHttpErrors(res))
      this.setToken(json.token)
    } catch (e) {
      return e;
    }
  }

  signUp = async (email, pass) => {
    const options = this.makeOptions("POST", true, { email: email, password: pass })
    try {
      const res = await fetch(URL + "/api/users", options)
      const json = await (handleHttpErrors(res))
      this.setToken(json.token)
    } catch (e) {
      return e;
    }
  }


  //Returns promise - Contains array of StarWars characters

  starWarsFetch = async (amount) => {
    const options = this.makeOptions("GET", true)
    return await fetch(URL + `/api/swapi?amount=${amount}`, options, true).then(handleHttpErrors)

  }

  //Returns promise - Contains array of all users
  getUsers = async () => {
    const options = this.makeOptions("GET", true)
    return await fetch(URL + "/api/users", options).then(handleHttpErrors)
  }

  //Returns promise - Contains edited user {email and role}
  editUser = async (email) => {
    const options = this.makeOptions("PUT", true)
    return await fetch(URL + `/api/users/${email}`, options).then(handleHttpErrors)
  }

  //Returns promise - Contains array of all roles
  getRoles = async () => {
    const options = this.makeOptions("GET", true)
    return await fetch(URL + "/api/roles", options).then(handleHttpErrors)
  }

  //Returns promise - Contains array of dummyData
  getDummyData = async (start, end, sortStr) => {
    const options = this.makeOptions("GET", true)
    const res = await fetch(URL + `/api/dummyData/?start=${start}&end=${end}${sortStr}`, options)
    var u = URL + `/api/dummyData/?start=${start}&end=${end}${sortStr}`
    console.log(u)
    return await (handleHttpErrors(res))
  }
}
const facade = new ApiFacade();
export default facade;