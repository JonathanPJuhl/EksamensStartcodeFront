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

  function makeOptionsForFileUploadCheck(method, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "multipart/form-data",
        "x-apikey": "433af1efc8d461180710da3b97fe5dba57282121732dbfe2ee93b93f05c8be24",
        Accept: "application/json",
      },
    };
    if (body) {
      opts.body = body;
    }
    return opts;
  };

  export {makeOptionsForFileUpload, makeOptionsForFileUploadCheck};