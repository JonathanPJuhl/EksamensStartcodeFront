import '../App.css';
import React, { useState, useEffect } from "react";
import { fetchUsername } from "./decodeJWT";
import {accountURL} from "../settings"


function About() {
  const [accountInfo, setaccountInfo] = useState([]);
  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    const data = await fetch(accountURL + fetchUsername());

    const items = await data.json();
    console.log(items);
    setaccountInfo(items);
  };
  return (
    <div>
        <p>Username:</p>
        <input type="text" value={accountInfo.username}></input>
        <p>Recoveryquestion: </p>
        <input type="text" value={accountInfo.recoveryquestion}></input>
        <br></br>
        <br></br>
        <p>Forgot your password - or just want to reset it?</p>
        <button class="buttons" type="button">Reset password</button>
    </div>
  );
}

export default About;
