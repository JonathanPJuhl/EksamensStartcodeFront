import Nav, { NavNotLoggedIn } from "../Pages/PageAdditions/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Reset, {ResetPassword} from "../Pages/resetPassword"
import React, { useState, useEffect } from "react";
import { fetchData} from "../Authentication/decodeJWT";
import LogIn from "../Pages/Login"
import AddUserUI from "../Pages/AddUserPage";
import { Link } from "react-router-dom";
import logoutUser from "../Functionality/Logout";
import checkToken from "../Authentication/CheckLocalStorageForToken"

function Setup () {

    let logged = checkToken();

    const [loggedIn, setLoggedIn] = useState(logged);

    const Login = () => (
        < LogIn setLoggedIn = { setLoggedIn } />
    );

    const Home = () => (
        <div>
          <h1>Welcome!</h1>
        </div>
     );

    function LoggedIn() {
        const [dataFromServer, setDataFromServer] = useState("Loading...");
  
        useEffect(() => {
          fetchData().then((data) => setDataFromServer(data.msg));
        }, []);
  
        return (
          <div>
            <h3>{dataFromServer}</h3>
          </div>
        );
    }
    const HomeLoggedIn = () => <LoggedIn />;



    
    const signup = () => {
        return AddUserUI();
    };
    const logout = () => {
        setLoggedIn(false);
        return <div>{logoutUser()}</div>;
    };


    const logoutBtn = () => {
        return (
          <div>
            <p>Are you sure you want to log out?</p>
            <Link to="/">
              <button type="button" onClick={logout}>
                Logout
              </button>
            </Link>
          </div>
        );
    };

    return (
        !loggedIn ? (
          <Router>
            <div className="App">
              <NavNotLoggedIn />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={signup} />
                <Route path="/resetpass" component={Reset}/>
                <Route path="/resetPW/*" component={ResetPassword}/>
                <Route component={ResetPassword} />
              </Switch>
            </div>
          </Router>
        ) : (
          <div>
            <Router>
              <div className="App">
                <Nav />
                <Switch>
                  <Route path="/" exact component={HomeLoggedIn} />
                  <Route path="/sys-frontend/" exact component={HomeLoggedIn} />
                  <Route path="/logout" component={logoutBtn} />
                </Switch>
              </div>
            </Router>
          </div>
        )
    );
}
export default Setup;