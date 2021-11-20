import { getToken, loggedIn } from "../Functionality/Login";
import handleHttpErrors from "../Errors/Errors";
import jwt_decode from "jwt-decode";
import { adminURL, userURL } from "../../settings";
import makeOptions from "../Functionality/MakeOptionsWithToken";

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

  if (rolesArr.includes("admin")) {
    options = makeOptions("GET", true);
    return fetch(adminURL, options).then(handleHttpErrors);
  } else options = makeOptions("GET", true);
  
  return fetch(userURL, options).then(handleHttpErrors);
};
export { fetchData, fetchUsername, username };
