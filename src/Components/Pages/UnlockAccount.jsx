import {unlockURL} from "../../settings"
import "../../App.css";
import React, { useState } from "react";
import makeOptions from "../Functionality/MakeOptionsWithToken";

function Unlock() {

  const [accountInfo, setaccountInfo] = useState({email: "", passwordForUnlocking: ""});

  const fetchSearchData = async () => {
    const options = makeOptions("POST", false, accountInfo);
    const answer = await fetch(unlockURL, options);
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
        <form onChange={HandleOnChange} >
        <p>Email:</p>
        <input type="email" id="email"></input>
        <p>Password for unlocking: </p>
        <input type="text" id="passwordForUnlocking"></input>
        <br></br>
        <br></br>
        <input class="buttons" type="button" value="Submit" onClick={fetchSearchData}Reset password/>
        </form >
    </div>
  );
}

export default Unlock;