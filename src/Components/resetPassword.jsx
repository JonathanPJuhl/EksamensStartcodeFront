import {resetURL, newPasswordURL} from "../settings"
import "../App.css";
import React, { useState } from "react";
import handleHttpErrors from "../Components/Errors"
import * as ReactBootStrap from "react-bootstrap";

const makeOptions = (method, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      data: { access_key: "5feeee1a869fedc6e6e24e62c735bc22" },
    };
    if (body) {
        opts.body = JSON.stringify(body);
      }
    return opts;
  };
  
function Reset(){
const [accountInfo, setaccountInfo] = useState({email: "", answerToSecurityQuestion: ""});


const fetchSearchData = async () => {
    const options = makeOptions("POST", accountInfo);
    return fetch(resetURL, options)
      .then(handleHttpErrors)
       .then(alert("Mail sent to: " + accountInfo.email))
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
      <p>Username:</p>
      <input type="text" id="email"></input>
      <p>Answer to recoveryquestion: </p>
      <input type="text" id="answerToSecurityQuestion"></input>
      <br></br>
      <br></br>
      <p>Forgot your password - or just want to reset it?</p>
      <input class="buttons" type="button" value="Submit" onClick={fetchSearchData}Reset password/>
      </form >
  </div>
);
}
function ResetPassword(){
  const [newPass, setNewPass] = useState({username: "", password: "", passConfirm: ""});

  
  const HandleOnChangePass = (evt) => {
    evt.preventDefault();
    let target = evt.target;
    let id = target.id;
    let value = target.value;

    setNewPass({ ...newPass, [id]: value });
    };

const fetchSearchDataPass = async () => {
    const options = makeOptions("POST", newPass);
    return fetch(newPasswordURL, options)
      .then(handleHttpErrors)
       
      .then(alert("Password successfully reset"));
  };
  

  return (
    <div>
        <form onChange={HandleOnChangePass}>
        <p>Email:</p>
        <input type="text" id="username"></input>
        <p>New password:</p>
        <input type="text" id="password"></input>
        <p>Confirm password </p>
        <input type="text" id="passConfirm"></input>
        <br></br>
        <br></br>
        <p>Create new password</p>
        <input type="button" class="buttons" type="button" value="Submit" onClick={fetchSearchDataPass}/>
        </form>
    </div>
  );
}

export default Reset;
export {ResetPassword};