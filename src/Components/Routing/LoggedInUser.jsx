import Nav from "../Pages/PageAdditions/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchData } from "../Authentication/decodeJWT";
import { Link, Redirect } from "react-router-dom";
import logoutUser from "../Functionality/Logout";
import UserHomePage from "../Pages/UserHomePage"
import Connections from "../Pages/Connections";
import SearchForUsers from "../Pages/SearchUsers";

export default function LoggedInUser ( { setLoggedIn }, loggedIn ) {
    
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

    const ConnectionsPage = () => <Connections/>;

    const FindConnectionsPage = () => <SearchForUsers/>

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
                <Nav />
                <Switch>
                  <Route path="/" exact component={HomeLoggedIn} />
                  <Route path="/sys-frontend/" exact component={HomeLoggedIn} />
                  <Route path="/profile/" exact component={showUserPage} />
                  <Route path="/connections/" exact component={ConnectionsPage} />
                  <Route path="/findconnections/" exact component={FindConnectionsPage} />
                  <Route path="/logout" component={logoutBtn} />
                </Switch>
              </div>
            </Router>
        </div>
    )
}