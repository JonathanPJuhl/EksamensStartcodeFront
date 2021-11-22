import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import loginWithUser from "../Functionality/Login";
import ReCAPTCHA from "react-google-recaptcha";
import { captcha } from "../../settings";
import axios from "axios";

function LogIn({ setLoggedIn }) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);
    const [captchaVal, setCaptcha] = useState();
    
    const [ip, setIP] = useState("");

    const getData = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      setIP(res.data.IPv4);
    };

    useEffect(() => {
      getData();
    }, []);

    const handleKeyDown = (evt) => {
      evt.preventDefault();
      let string = evt.target.value;
      if (string.includes("<script>")) {
        alert("Den går ikke du! Vi har gemt din ip: " + ip);
        console.log(JSON.stringify(ip));
        return false;
      }
      return true;
    };

    function validateRecaptcha() {
          if (captchaVal === undefined) {
              return false;
          } else {
              return true;
          }
    }
    const performLogin = (evt) => {
      //evt.preventDefault();
      if(validateRecaptcha()) {
      loginWithUser(loginCredentials.username, loginCredentials.password, {setLoggedIn}); 
      }
      else {
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
        <input placeholder="User Name" id="username" onChange={handleKeyDown} />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleKeyDown}
        />
        <div>
          <ReCAPTCHA sitekey={captcha} onChange={onCaptchaChange} />
        </div>
        <Link to="/">
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
