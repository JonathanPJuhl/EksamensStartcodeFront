import { createUserURL } from "../../settings";
import makeOptions from "../Functionality/MakeOptionsWithToken";

export default async function AddUser(user) {
    const options = makeOptions("POST", false, user);
    const added =  fetch(createUserURL, options);
    /*if(!added.ok) {
      alert("Something went wrong, please try again");
    } else {
      alert("Success")
    }*/
  }