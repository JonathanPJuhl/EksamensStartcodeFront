import { getToken, loggedIn } from "../Functionality/Login";
import handleHttpErrors from "../Errors/Errors";
import jwt_decode from "jwt-decode";
import { adminURL, userURL } from "../../settings";
let username;
const fetchUsername = () => {
  const decodeToken = (token) => {
    return jwt_decode(token, { complete: true });
  };

  let getDecodedToken = () => {
    let token = getToken();

    if (token) {
      return decodeToken(token);
    }

    return null;
  };
  let tokenFinished = getDecodedToken();
  username = tokenFinished.username;
  
  if (username == undefined) {
    return (
      <div>
        <p>Please login</p>
      </div>
    );
  }
  return username;
};

const fetchData = () => {
  const decodeToken = (token) => {
    return jwt_decode(token, { complete: true });
  };

  let getDecodedToken = () => {
    let token = getToken();

    if (token) {
      return decodeToken(token);
    }

    return null;
  };
  let tokenFinished = getDecodedToken();

  let roles = tokenFinished.roles;

  let rolesArr = [];
  rolesArr = roles.split(",");
  let options = "";
  console.log(rolesArr);
  if (rolesArr.includes("admin")) {
    options = makeOptions("GET", true); //True adds the token
    return fetch(adminURL, options).then(handleHttpErrors);
  } else options = makeOptions("GET", true); //True adds the token
  return fetch(userURL, options).then(handleHttpErrors);
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
export { fetchData, fetchUsername, username };
