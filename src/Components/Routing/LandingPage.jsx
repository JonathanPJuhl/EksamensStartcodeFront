import React, { useState } from "react";
import { getTokenExpire} from "../Authentication/decodeJWT";
import LoggedInUser from "./LoggedInUser";
import LoggedInAdmin from "./LoggedInAdmin";
import HomeNotLoggedIn from "./HomeNotLoggedIn";

function Setup () {

    let logged = getTokenExpire();

    const [loggedIn, setLoggedIn] = useState(logged);
    const [role, setRole] = useState("");

    if(loggedIn && (role === "user")) {
      return <LoggedInUser setLoggedIn = {setLoggedIn} loggedIn = { loggedIn }></LoggedInUser>
    } 
    else if (loggedIn && (role === "admin")) {
      return <LoggedInAdmin setLoggedIn = {setLoggedIn} loggedIn = { loggedIn }></LoggedInAdmin>
    } 
    else return <HomeNotLoggedIn setLoggedIn = { setLoggedIn } setRole = { setRole } />
    
}
export default Setup;