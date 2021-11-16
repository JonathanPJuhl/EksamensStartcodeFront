import { accountURL } from "../../settings";
import React, { useState, useEffect } from "react";
import handleHttpErrors from "../Errors/Errors";
import { fetchUsername } from "../Authentication/decodeJWT";
import { getToken, loggedIn } from "../Functionality/Login";

export default function UserHomePage() {

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

    /*const fetchUserData = async () => {
        const options = makeOptions("GET", true);
        return fetch(accountURL + fetchUsername(), options)
          .then(handleHttpErrors)
           .then(setaccountInfo())
      }; */
      useEffect(() => {
        const options = makeOptions("GET", true);
        return fetch(accountURL + fetchUsername(), options)
          .then(handleHttpErrors)
          .then((res) =>setaccountInfo(res)) // res.json())
          .then((data) => setaccountInfo(data)).then(console.log(accountInfo))
      },[]);
    
      if( accountInfo === undefined)  {
        return <div> still loading </div>
      }

    return (
     
        <div>
          { console.log(accountInfo) }
          <form /*onChange={HandleOnChange}*/>
            <p>Username:</p>
            {/* <input type="text" id="username" value = {accountInfo.username}></input> */}
            <p>Answer to recoveryquestion: </p>
            <input type="text" id="answerToSecurityQuestion"></input>
            <br></br>
            <br></br>
            <p>Forgot your password - or just want to reset it?</p>
            <input
              class="buttons"
              type="button"
              value="Submit"
              // onClick={fetchSearchData}
              Reset
              password
            />
          </form>
        </div>
    );
}
