import { accountURL } from "../../settings";
import React, { useState, useEffect } from "react";
import { fetchUsername } from "../Authentication/decodeJWT";
import { getToken, loggedIn } from "../Functionality/Login";
import UpdateProfile from "../Functionality/UpdateProfile";

export default function UserHomePage() {
  
  useEffect(() => {
    fetchItems();
  }, []);

  const [accountInfo, setaccountInfo] = useState({email: "", profileText: ""});

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const fetchItems = async () => {
    const options = makeOptions("GET", true);
    const accData = await fetch(accountURL + fetchUsername(), options);
    const accInfo = await accData.json();
  
    setaccountInfo(accInfo);
  };

  function HandleOnChange() {

  }
  
    return (
     
        <div>
          <form onChange={HandleOnChange}>
            <p>Username:</p>
            <input type="email" id="username" defaultValue = {accountInfo.email}></input> 
            <p>Profile Text:</p>
            <textarea type="text" id="profile-text" defaultValue = {accountInfo.profileText}></textarea>
            <br></br>
            <br></br>
            <input
              class="buttons"
              type="button"
              value="Update"
              onClick={UpdateProfile}
              Reset
              password
            />
          </form>
        </div>
    );
}
