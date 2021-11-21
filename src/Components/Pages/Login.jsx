import { Link } from "react-router-dom";
import React, { useState } from "react";
import loginWithUser from "../Functionality/Login";
import ReCAPTCHA from "react-google-recaptcha";
import { captcha } from "../../settings";

function LogIn({ setLoggedIn }) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);
    const [captchaVal, setCaptcha] = useState();
    
    function validateRecaptcha() {
          if (captchaVal === undefined) {
              return false;
          } else {
              return true;
          }
    }
    const performLogin = (evt) => {
      if(validateRecaptcha()) {
      evt.preventDefault();
      loginWithUser(loginCredentials.username, loginCredentials.password, {setLoggedIn}); 
      }
      else {
        evt.preventDefault();
        alert("Please confirm that you are not a robot")
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
          <input placeholder="User Name" id="username" />
          <input type="password" placeholder="Password" id="password" />
          <div>
            <ReCAPTCHA
               sitekey={captcha}
               onChange={onCaptchaChange}
            />
          </div>
          <Link to="/profile">
            <button type="button" id="btnn" onClick={performLogin}>
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