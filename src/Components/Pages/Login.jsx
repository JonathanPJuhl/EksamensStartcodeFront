import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import loginWithUser from "../Functionality/Login";

function LogIn({ setLoggedIn }) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = (evt) => {
      evt.preventDefault();
      console.log(loginCredentials);
      loginWithUser(loginCredentials.username, loginCredentials.password, {setLoggedIn});      
    };
  
    const onChange = (evt) => {
      setLoginCredentials({
        ...loginCredentials,
        [evt.target.id]: evt.target.value,
      });
    };

    return (
      <div>
        <h2>Login</h2>

        <form onChange={onChange}>
          <input placeholder="User Name" id="username" />
          <input type="password" placeholder="Password" id="password" />

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