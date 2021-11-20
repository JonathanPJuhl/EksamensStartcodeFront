import { getToken, loggedIn } from "../Functionality/Login";

export default function makeOptions(method, addToken, body) {
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

  function makeOptionsForFileUpload(method, addToken, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "multipart/*",
        Accept: "application/octet-stream",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = body;
    }
    return opts;
  };

  export {makeOptionsForFileUpload};