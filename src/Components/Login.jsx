import handleHttpErrors from "./Errors";
import { loginURL } from "../settings";

const getToken = () => {
  return localStorage.getItem("jwtToken");
};

const removeToken = () => {
  return localStorage.removeItem("jwtToken");
};

const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
};
const loginWithUser = (user, password) => {
  const options = makeOptions("POST", false, {
    username: user,
    password: password,
  });
  return fetch(loginURL, options)
    .then(handleHttpErrors)
    .then((res) => {
      setToken(res.token);
    });
};
const makeOptions = (method, addToken, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (addToken && loggedIn()) {
    opts.headers["x-access-token"] = getToken();
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};

export default loginWithUser;
export { getToken, loggedIn, removeToken };
