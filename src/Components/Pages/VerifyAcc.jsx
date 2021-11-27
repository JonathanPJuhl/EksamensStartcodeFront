import {verifyURL} from "../../settings"
import "../../App.css";
import React, { useState } from "react";
import makeOptions from "../Functionality/MakeOptionsWithToken";

export default function Verify() {
const [accountInfo, setaccountInfo] = useState({email: "", passwordForVerifying: ""});

  const fetchSearchData = async () => {
    const options = makeOptions("POST", false, accountInfo);
    const answer = await fetch(verifyURL, options);
    const output = await answer.json();
    console.log(output);
  };
  
  const HandleOnChange = (evt) => {
    evt.preventDefault();
    let target = evt.target;
    let id = target.id;
    let value = target.value;

    setaccountInfo({ ...accountInfo, [id]: value });
  };
  return (
    <div>
      <form onChange={HandleOnChange}>
        <p>Email:</p>
        <input type="email" id="email"></input>
        <p>Password for verifying: </p>
        <input type="text" id="passwordForVerifying"></input>
        <br></br>
        <br></br>
        <input
          class="buttons"
          type="button"
          value="Submit"
          onClick={fetchSearchData}
          Reset
          password
        />
      </form>
    </div>
  );
}
