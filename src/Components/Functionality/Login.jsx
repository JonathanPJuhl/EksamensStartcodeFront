import handleHttpErrors from "../Errors/Errors";
import { loginURL } from "../../settings";
import checkToken from "../Authentication/CheckLocalStorageForToken";
import makeOptions from "../Functionality/MakeOptionsWithToken";


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

export default loginWithUser;
export { getToken, loggedIn, removeToken };
