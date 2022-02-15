import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardLink,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const Login = (props) => {
  // const [inputUsername, setInputUsername] = useState("")
  // const [inputPassword, setInputPassword] = useState("")
  const [loginInfo, setLoginInfo] = useState({});

  // const loginButtonHandler = (e) => {

  // };

  const inputHandler = (e) => {
    let { name, value } = e.target;
    // username and password is assigned to updatedInfo
    const updatedInfo = { ...loginInfo, [name]: value };
    setLoginInfo(updatedInfo);
    // console.log(updatedInfo, loginInfo);
  };

  const loginButtonHandler = (e) => {
    axios
      .post("http://localhost:8000/api/login/", loginInfo)
      .then((response) => {
        //backend sends back response (user) and sets the user state for App
        // const newUser = response.data;
        props.setUser(response.data);
        localStorage.setItem("loggedUser", JSON.stringify(response.data));
      })
      .catch((error) => console.log(error));
  };

  // useEffect((props) => {
  //   const loggedInUser = localStorage.getItem("loggedUser");
  //   console.log(loggedInUser);
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     props.setUser(foundUser);
  //   }
  // }, []);

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto align-self-center">
        <Col>
          <Card className="shadow p-5 mb-5 bg-white rounded">
            <header className="my-3 mx-1 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-bag-heart"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
                />
              </svg>
              <h1>Login</h1>
            </header>
            <Form inline>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0 my-2">
                <Label className="me-sm-2" for="username">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Your username"
                  type="username"
                  onChange={inputHandler}
                />
              </FormGroup>
              <FormGroup className="mb-2 me-sm-2 mb-sm-0 my-2">
                <Label className="me-sm-2" for="password">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  onChange={inputHandler}
                />
              </FormGroup>
              <Button
                color="primary"
                outline={true}
                onClick={loginButtonHandler}
                className="my-2"
              >
                Login
              </Button>
              <p>
                Don't have an account?
                <CardLink outline={true}> Register here</CardLink>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
