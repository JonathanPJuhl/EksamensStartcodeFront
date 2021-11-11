import { createUserURL } from "../../settings";
export default function AddUser(user) {
    const options = makeOptions("POST", false, user);
    console.log(createUserURL, options);
    return fetch(createUserURL, options);
  }
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (body) {
      opts.body = JSON.stringify(body);
      console.log(JSON.stringify(body));
    }
    return opts;
  };