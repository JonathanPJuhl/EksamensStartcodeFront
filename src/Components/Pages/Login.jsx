import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import loginWithUser from "../Functionality/Login";
import ReCAPTCHA from "react-google-recaptcha";
import { captcha } from "../../settings";
import CheckForInjection from "../Functionality/CheckForInjection";
import axios from "axios";
import AddIPToDB from "../Functionality/AddIPToDB";
import SendTwoFactorCode, { ValidateTwoFactor } from "../Functionality/TwoFactor";

function LogIn({ setLoggedIn, setRole }) {
    const init = { username: "", password: "", twoFactor: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);
    const [captchaVal, setCaptcha] = useState();
    const [ip, setIP] = useState("");
    const [twoFactor, setTwofactor] = useState(null);
    const [twoFactorSent, setTwofactorSent] = useState(false);

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
      ValidateTwoFactor(loginCredentials.username, loginCredentials.twoFactor, {setTwofactor});
      
      if (!validateRecaptcha()){
        alert("Please confirm that you are not a robot")
      } 
      else if (!CheckForInjection(loginCredentials.username) ||
        !CheckForInjection(loginCredentials.password)) {
        AddIPToDB(ip, loginCredentials.username, "injection");
        return;
      } 
      else if (twoFactorSent === false) {
        SendTwoFactorCode(loginCredentials.username, loginCredentials.password, ip, {setTwofactorSent});
        alert("A verification has been sent to your email");
      }
      else if (validateRecaptcha() &&
        CheckForInjection(loginCredentials.username) &&
        CheckForInjection(loginCredentials.password) && 
        twoFactor === true) {

        loginWithUser(loginCredentials.username, loginCredentials.password, ip, {setLoggedIn, setRole}); 
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

  return (
    <div>
      <h2>Login</h2>

      <form onChange={onChange}>
        <input placeholder="User Name" id="username"/>
        <input type="password" placeholder="Password" id="password"/>
        <input  type="password" placeholder="2 step verification" id="twoFactor"/>
        <div>
          <ReCAPTCHA sitekey={captcha} onChange={onCaptchaChange} />
        </div>
        <Link to="/">
          <button type="button" id="btnn" onClick={PerformLogin}>
            Login
          </button>
        </Link>
        <Link to="/resetpass">
          <p>Forgot password?</p>
        </Link>
      </form>
    </div>
  );
}
export default LogIn;
