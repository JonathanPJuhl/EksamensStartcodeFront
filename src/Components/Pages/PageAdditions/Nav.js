import "../../../App.css";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect } from "react";
import { getTokenExpire } from "../../Authentication/decodeJWT";


function Nav() {
  
  useEffect(() => {
  }, []);

  const navStyle = {
    color: " white",
  };

    return(
      getTokenExpire() ? (
        <nav>
          <Row>
            <Col>
              <Link className="home" style={navStyle} to="/">
                <h3>Home</h3>
              </Link>
            </Col>
          </Row>
          <Row>
            <ul className="links">
                <Link style={navStyle} to="/profile/">
                  <li>Profile</li>
                </Link> 
                <Link style={navStyle} to="/logout">
                  <li>Logout</li>
                </Link>
            </ul>
          </Row>
        </nav>
    ): ( NavNotLoggedIn() )
    );
}

function NavNotLoggedIn() {
  
  const navStyle = {
    color: " white",
  };

  return (
    <nav>
      <Link className="home" style={navStyle} to="/">
        <h3>Home</h3>
      </Link>

      <ul className="links">
        <Link style={navStyle} to="/login">
          <li>Login</li>
        </Link>

        <Link style={navStyle} to="/signup">
          <li>Sign up</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
export { NavNotLoggedIn };
