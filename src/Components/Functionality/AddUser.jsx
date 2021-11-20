import { createUserURL } from "../../settings";
import makeOptions from "../Functionality/MakeOptionsWithToken";

export default function AddUser(user) {
    const options = makeOptions("POST", false, user);
    console.log(createUserURL, options);
    return fetch(createUserURL, options);
  }