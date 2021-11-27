import {resetURL, newPasswordURL} from "../../settings"
import "../../App.css";
import React, { useState } from "react";
import handleHttpErrors from "../Errors/Errors"
import makeOptions from "../Functionality/MakeOptionsWithToken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reset() {

  const [accountInfo, setaccountInfo] = useState({email: ""});

  const fetchSearchData = async () => {
    const options = makeOptions("POST", false, accountInfo);
    return fetch(resetURL, options)
      .then(handleHttpErrors)
       .then(toast("Mail sent to: " + accountInfo.email))
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
          <ToastContainer/>
        <p>Username:</p>
        <input type="text" id="email"></input>
        <br></br>
        <br></br>
        <p>Send reset link to this mail</p>
        <input class="buttons" type="button" value="Submit" onClick={fetchSearchData}Reset password/>
        </form >
    </div>
  );
}

function ResetPassword(){
  const [newPass, setNewPass] = useState({email: "", password: "", passConfirm: "", key: ""});

  
  const HandleOnChangePass = (evt) => {
    evt.preventDefault();
    let target = evt.target;
    let id = target.id;
    let value = target.value;

    setNewPass({ ...newPass, [id]: value });
    };

  const fetchSearchDataPass = async (evt) => {
    evt.preventDefault()
    if (newPass.password !== newPass.passConfirm) {
      toast("passwords don't match");
      return
    } 
    else if (newPass.password === newPass.passConfirm && (newPass.password.length < 8 || newPass.password.legnth > 64)) {
      toast("password must be more than 8 characters");
      return
    }
    const options = makeOptions("POST", false, newPass);
    return fetch(newPasswordURL, options)
      .then(handleHttpErrors)
      .then(alert("Password successfully reset"));
  };
  

  return (
    <div>
        <form onChange={HandleOnChangePass}>
        <p>Email:</p>
        <input type="text" id="email"></input>
        <p>New password:</p>
        <input type="password" id="password"></input>
        <p>Confirm password </p>
        <input type="password" id="passConfirm"></input>
        <p>Confirmation key </p>
        <input type="password" id="key"></input>
        <br></br>
        <br></br>
        <input type="submit" class="buttons" value="Create new password" onClick={fetchSearchDataPass}/>
        </form>
    </div>
  );
}

export default Reset;
export {ResetPassword};