import handleHttpErrors from "../Errors/Errors";
import { loginURL } from "../../settings";
import checkToken from "../Authentication/CheckLocalStorageForToken";

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
 async function loginWithUser (user, password, {setLoggedIn}) {
  const options = makeOptions("POST", true, {
    username: user,
    password: password,
  });
   return await fetch(loginURL, options)
     .then(handleHttpErrors)
      .then((res) => {
       setToken(res.token);
   }).then(() => setLoggedIn(checkToken()));
 }
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
