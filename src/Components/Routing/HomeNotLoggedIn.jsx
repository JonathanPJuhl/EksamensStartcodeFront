import { NavNotLoggedIn } from "../Pages/PageAdditions/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Reset, {ResetPassword} from "../Pages/resetPassword"
import Unlock from "../Pages/UnlockAccount";
import Verify from "../Pages/VerifyAcc";
import LogIn from "../Pages/Login"
import AddUserUI from "../Pages/AddUserPage";

export default function HomeNotLoggedIn ( {setLoggedIn, setRole}) {
   
    const Login = () => (
        < LogIn setLoggedIn = { setLoggedIn } setRole = { setRole } />
    );

    const Home = () => (
        <div>
          <h1>Welcome!</h1>
        </div>
     );

    const signup = () => {
        return AddUserUI();
    };

    return (
        <Router>
          <div className="App">
            <NavNotLoggedIn />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/unlock" exact component={Unlock} />
              <Route path="/verify" exact component={Verify} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={signup} />
              <Route path="/resetpass" component={Reset}/>
              <Route path="/resetPW/" component={ResetPassword}/>
              <Route component={ResetPassword} />
            </Switch>
          </div>
        </Router>
  )
}