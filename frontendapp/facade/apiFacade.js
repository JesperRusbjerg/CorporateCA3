import { AsyncStorage } from 'react-native';
import { Base64 } from 'js-base64';

// const URL = "https://perlt.net/CA3"
const URL = "https://0b304646.ngrok.io"   

async function handleHttpErrors(res) {
  if (!res.ok) {
    const fullError = await res.json();
    throw { status: res.status, fullError };

  }
  const json = await res.json();
  json["status"] = res.status;
  return json;
}

class ApiFacade {
  makeOptions = async (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && this.loggedIn()) {
      opts.headers["x-access-token"] = await this.getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

  setToken = async (token) => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.setItem("token", token);
  }

  getToken = async () => {
    const res = await AsyncStorage.getItem("token");
    return res;
  }

  getTokenObject = async () => {
    const res = await AsyncStorage.getItem("token");
    const obj = this.parseJwt(res);
    return obj;
  }

  loggedIn = () => {
    const loggedIn = this.getToken() != null;
    return loggedIn;
  }

  logout = async () => {
    await AsyncStorage.removeItem("token");
  }

  login = async (email, pass) => {
    try {
      const options = await this.makeOptions("POST", false, { email: email, password: pass })
      const res = await fetch(URL + "/api/login", options);
      const json = await handleHttpErrors(res);
      await this.setToken(json.token);
      return json;
    } catch (e) {
      return e;
    }
  }

  signUp = async (pass, email) => {
    try {
      const options = await this.makeOptions("POST", false, { password: pass, email: email })
      const res = await fetch(URL + "/api/login/create", options);
      const json = await handleHttpErrors(res);
      await this.setToken(json.token);
      return json;
    } catch (e) {
      return e;
    }
  }

  //Returns promise - Contains array of StarWars characters
  starWarsFetch = async (amount) => {
    const options = await this.makeOptions("GET", true)
    const res = await fetch(`${URL}/api/swapi?amount=${amount}`, options);
    const json = await handleHttpErrors(res);
    return json;
  }

  //Returns promise - Contains array of all users
  getUsers = async () => {
    try {
      const options = await this.makeOptions("GET", true)
      const res = await fetch(URL + "/api/users", options);
      const json = await await handleHttpErrors(res);
      return json;
    } catch (e) {
      return e;
    }
  }

  //Returns promise - Contains edited user {email and role}
  editUser = async (email) => {
    const options = await this.makeOptions("PUT", true)
    console.log(URL + `/api/users/${email}`);
    const res = await fetch(URL + `/api/users/${email}`, options);
    console.log(res);
  }

  //Returns promise - Contains array of all roles
  getRoles = () => {
    const options = this.makeOptions("GET", true)
    return fetch(URL + "/api/roles", options).then(handleHttpErrors)
  }

  //Returns promise - Contains array of dummyData
  getDummyData = (amount) => {
    const options = this.makeOptions("GET", true)
    return fetch(URL + `/api/dummyData/${amount}`, options).then(handleHttpErrors)
  }

  parseJwt = (token) => {
    const t = token.split(".");
    const string = t[1];
    const json = Base64.decode(string);
    const obj = JSON.parse(json);
    return obj;
  };
}
const facade = new ApiFacade();
export default facade;


