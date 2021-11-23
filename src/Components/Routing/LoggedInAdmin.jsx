import { AdminNav } from "../Pages/PageAdditions/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchData } from "../Authentication/decodeJWT";
import { Link, Redirect } from "react-router-dom";
import logoutUser from "../Functionality/Logout";
import UserHomePage from "../Pages/UserHomePage"
import UserOverview from "../Pages/UserOverview";

export default function LoggedInAdmin ( { setLoggedIn }, loggedIn) {

    function OverView() {
        return <UserOverview/>
    }

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

    const HomeLoggedIn = () => <LoggedIn/>;

    const showUserPage = () => {
        if(loggedIn === false) {
          return <Redirect to="localhost:3000"> {window.location.reload()}</Redirect>
        }
        return UserHomePage();
      }
  
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
    }

    return (
        <div>
            <Router>
              <div className="App">
                <AdminNav />
                <Switch>
                  <Route path="/" exact component={HomeLoggedIn} />
                  <Route path="/overview" exact component={OverView} />
                  <Route path="/sys-frontend/" exact component={HomeLoggedIn} />
                  <Route path="/profile/" exact component={showUserPage} />
                  <Route path="/logout" component={logoutBtn} />
                </Switch>
              </div>
            </Router>
        </div>
    )
}