import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddUser from "../Functionality/AddUser";
import "../../App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";
import { captcha } from "../../settings";
import {CheckObjForInjection} from "../Functionality/CheckForInjection";

function AddUserUI() {

  const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const init = {
    username: "",
    password: "",
    passCheck: "",
  };
  const [captchaVal, setCaptcha] = useState();

  const [user, setUser] = useState(init);

  function validateRecaptcha() {
    if (captchaVal === undefined) {
        return false;
    } else {
        return true;
    }
  }

  const handleChange = (evt) => {
    evt.preventDefault();
    let target = evt.target;
    let id = target.id;
    let value = target.value;

    setUser({ ...user, [id]: value });
  };
  const onCaptchaChange = (value) => {
    setCaptcha(value);
  };


  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(user.username);
    if(!CheckObjForInjection(user)) {
      toast("Please don't input scripts")
      return;
    }
    if (!mailRegex.test(user.username)){
      toast("Invalid email");
      return
    }
    if (!validateRecaptcha()) {
      toast("please confirm you are not a robot");
      return
    }
    if (user.password !== user.passCheck) {
      toast("passwords don't match");
      return
    } 
    else if (user.password === user.passCheck && (user.password.length < 8 || user.password.legnth > 64)) {
      toast("password must be more than 8 characters");
      return
    }
    else {
      AddUser(user);
    }
  }

  return (
    <div>
      <ToastContainer />
      <Container fluid>
        <form onChange={handleChange}>
          <Row>
            <Col>
              <input
                class="stretch-to-fit"
                type="email"
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
              <ReCAPTCHA sitekey={captcha} onChange={onCaptchaChange} />
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
