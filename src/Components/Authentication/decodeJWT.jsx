import { getToken } from "../Functionality/Login";
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
  
  if (username === undefined) {
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
const getRoles = (token) => {
  const decodeToken = (token) => {
    return jwt_decode(token, { complete: true });
  };
  let tokenFinished;
  if (token) {
    tokenFinished = decodeToken(token);
  }

  let roles = tokenFinished.roles;
  let rolesArr = [];
  rolesArr = roles.split(",");

  return rolesArr[0];
};

const getTokenExpire = () => {
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
  
  if(getDecodedToken() !== undefined && getDecodedToken() !== null) {
    let tokenFinished = getDecodedToken();
      let expire = tokenFinished.exp;
      let currentDate = new Date();

      if(expire === undefined) {
        //localStorage.removeItem("jwtToken");
        return false;
      } else if (expire <= Math.floor(currentDate.getTime()/1000)) {
        //localStorage.removeItem("jwtToken");
        return false;
      }
      return true;
  }
  return false;
};
export { fetchData, fetchUsername, getTokenExpire, getRoles, username };
