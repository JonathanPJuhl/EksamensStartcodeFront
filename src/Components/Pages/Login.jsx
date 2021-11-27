import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import loginWithUser from "../Functionality/Login";
import ReCAPTCHA from "react-google-recaptcha";
import { captcha } from "../../settings";
import {CheckObjForInjection} from "../Functionality/CheckForInjection";
import axios from "axios";
import AddIPToDB from "../Functionality/AddIPToDB";
import SendTwoFactorCode from "../Functionality/TwoFactor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LogIn({ setLoggedIn, setRole }) {
    const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const init = { username: "", password: "", twoFactor: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);
    const [captchaVal, setCaptcha] = useState();
    const [ip, setIP] = useState("");

    function validateRecaptcha() {
       if (captchaVal === undefined) {
           return false;
       } else {
           return true;
       }
    }

    const getData = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      setIP(res.data.IPv4);
    };

    useEffect(() => {
      getData();
    }, []);

    const PerformLogin = (evt) => {
      evt.preventDefault();
      if (!validateRecaptcha()){
        toast("Please confirm that you are not a robot")
        return;
      }
      if (!CheckObjForInjection(loginCredentials)) {
        toast("Please don't use scripts");
        AddIPToDB(ip, loginCredentials.username, "injection");
        return;
      }
      if(!mailRegex.test(loginCredentials.username)) {
        toast("Please enter a valid email");
        return;
      }
      if(evt.target.value === "Send two factor code") {
        SendTwoFactorCode(loginCredentials.username, loginCredentials.password, ip);
        toast("Twofactor validation mail sent");
        return;
      } 
      else if (evt.target.value === "Login") {
        loginWithUser(loginCredentials.username, loginCredentials.password, ip, loginCredentials.twoFactor, {setLoggedIn, setRole}); 
      }
      
    };
  
    const onChange = (evt) => {
      setLoginCredentials({
        ...loginCredentials,
        [evt.target.id]: evt.target.value,
      });
    };
    const onCaptchaChange = (value) => {
      setCaptcha(value);
    };
    function CheckWhatButtonShouldDo(){
      if(loginCredentials.twoFactor === "" || loginCredentials.twoFactor === null){
        return "Send two factor code"
      }
      return "Login"
    }

  return (
    <div>
      <h2>Login</h2>
      <ToastContainer />
      <form onChange={onChange}>
        <input placeholder="User Name" id="username"/>
        <input type="password" placeholder="Password" id="password"/>
        <input  type="password" placeholder="2 step verification" id="twoFactor"/>
        <div>
          <ReCAPTCHA sitekey={captcha} onChange={onCaptchaChange} />
        </div>
        <Link to="/">
          <input type="button" id="btnn" value={CheckWhatButtonShouldDo()} onClick={PerformLogin}>
          </input>
        </Link>
        <Link to="/resetpass">
          <p>Forgot password?</p>
        </Link>
      </form>
    </div>
  );
}
export default LogIn;
