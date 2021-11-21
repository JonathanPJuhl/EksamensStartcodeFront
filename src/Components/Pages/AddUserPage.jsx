import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddUser from "../Functionality/AddUser";
import "../../App.css";

function AddUserUI() {
  const init = {
    username: "",
    password: "",
    passCheck: "",
    recoveryquestion: "",
    answer: "",
  };
  const [user, setUser] = useState(init);

  const handleChange = (evt) => {
    evt.preventDefault();
    let target = evt.target;
    let id = target.id;
    let value = target.value;

    setUser({ ...user, [id]: value });
  };
  function handleSubmit(evt) {
    evt.preventDefault();
    if (user.password !== user.passCheck) {
      alert("passwords don't match");
    } else if (user.password === user.passCheck && user.password.length < 8) {
      alert("password must be more than 8 characters");
    } else {
      AddUser(user);
      alert("Success creating user, now please login");
    }
  }

  return (
    <div>
      <Container fluid>
        <form onChange={handleChange}>
          <Row>
            <Col>
              <input
                class="stretch-to-fit"
                type="text"
                id="username"
                placeholder="email"
              ></input>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <input
                type="password"
                class="stretch-to-fit"
                id="password"
                placeholder="password (minimum 8 characters)"
              ></input>
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type="password"
                class="stretch-to-fit"
                id="passCheck"
                placeholder="password confirmation"
              ></input>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <select
                class="stretch-to-fit"
                name="recoveryquestion"
                id="recoveryquestion"
              >
                <option value="Choose..." selected>
                  Choose...
                </option>
                <option value="First pets name">First pets name</option>
                <option value="Name of your highschool">
                  Name of your highschool
                </option>
                <option value="Mothers maiden name">Mothers maiden name</option>
                <option value="Street you grew up on">
                  Street you grew up on
                </option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <input
                type="text"
                class="stretch-to-fit"
                id="answer"
                placeholder="Answer for recovery question"
              ></input>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <input
                type="submit"
                class="stretch-to-fit"
                onClick={handleSubmit}
                value="Submit"
              ></input>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
}
export default AddUserUI;
