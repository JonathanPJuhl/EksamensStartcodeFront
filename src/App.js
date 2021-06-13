import "./App.css";


import Endpoint2 from "./Components/Endpoint2";
import Endpoint3 from "./Components/Endpoint3";
import Top5 from "./Components/top5";
import { Link } from "react-router-dom";
import Nav, { NavNotLoggedIn } from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchData} from "./Components/decodeJWT";
import loginWithUser from "./Components/Login";
import logoutUser from "./Components/Logout";
import AddUserUI from "./Components/AddUser";
import Reset, {ResetPassword} from "./Components/resetPassword"
import SpecificStockInfo from "./Components/ShowSpecificStockInfo";

function App() {
  let logged = false;


  if (localStorage.getItem("jwtToken") != null) {
    logged = true;
  }

  const [loggedIn, setLoggedIn] = useState(logged);

  function LogIn({ login }) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = (evt) => {
      evt.preventDefault();
      console.log(loginCredentials);
      login(loginCredentials.username, loginCredentials.password);
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
          <input placeholder="Password" id="password" />

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

  const logout = () => {
    setLoggedIn(false);
    return <div>{logoutUser()}</div>;
  };

  const login = (user, pass) => {
    LoginPage();
    loginWithUser(user, pass).then((res) => setLoggedIn(true));
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
  const signup = () => {
    return AddUserUI();
  };

  const ShowLandingPage = () =>
    !loggedIn ? (
      <Router>
        <div className="App">
          <NavNotLoggedIn />
          <Switch>
            <Route path="/" exact component={Home} />
           
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={signup} />
            <Route path="/resetpass" component={Reset}/>
            <Route path="/resetPW/*" component={ResetPassword}/>
            <Route path="/top5" component={Top5} />
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
              <Route path="/specifistock" component={SpecificStockInfo} />
              <Route path="/top5" component={Top5} />
              <Route path="/endpoint2" component={Endpoint2} />
              <Route path="/endpoint3" component={Endpoint3} />
              {/* <Route component={Home} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    );

  function LoginPage() {
    return <LogIn login={login} />;
  }

  return (
    <div className="App">
      <div>
        <ShowLandingPage />
      </div>
    </div>
  );
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

const Home = () => (
  <div>
    <h1>Welcome!</h1>
  </div>
);
const HomeLoggedIn = () => <LoggedIn />;

export default App;
