import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { NAME, DESCRIPTION, MOBILE_BREAKPOINT } from "../../defaults";
import { getWindowDimensions } from "../../helpers/window-dimensions";
import MotionDiv from "../../helpers/animated-motion-div";
import GoogleButton from "react-google-button";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";
import { BiArrowBack } from "react-icons/bi";
import { AiFillPushpin } from "react-icons/ai";

const Login = ({ back, register }) => {
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const loginEmail = useRef();
  const loginPassword = useRef();
  const { windowWidth } = getWindowDimensions();
  const [registerLink, setReigisterLink] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error !== "") {
      setTimeout(() => {
        setError("");

        if (registerLink) {
          setReigisterLink(false);
        }
      }, 5000);
    }
  }, [error]);

  const loginUser = async (regInfo) => {
    try {
      await login(regInfo);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setReigisterLink(true);
          setError(`The account ${regInfo.email} was not found.`);
          console.error(`The account ${regInfo.email} was not found: `, error);
          break;
        default:
          setError("An error occurred. Please try again.");
          console.error(error);
          break;
      }
    }
  };

  const signIn = (e) => {
    e.preventDefault();
    loginUser({
      email: loginEmail.current.value,
      password: loginPassword.current.value,
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <MotionDiv className="login d-flex justify-content-center align-items-center min-vh-100">
      <Card className="vw-100">
        <Card.Body>
          <BiArrowBack
            size="1.5rem"
            className="my-1 pointer"
            onClick={back && back}
          />
          <Card.Title className="text-center">
            {NAME}
            <AiFillPushpin className="pin" color="#D11A2A" />
          </Card.Title>
          <Card.Subtitle className="text-muted text-center">
            {DESCRIPTION}
          </Card.Subtitle>
          {error && (
            <Alert variant="danger" className="text-center p-1 my-1">
              {error}{" "}
              {registerLink && (
                <u className="pointer" onClick={register}>
                  Register here
                </u>
              )}
            </Alert>
          )}
          <Form className="credentials px-5 my-3" onSubmit={(e) => signIn(e)}>
            <Form.Group className="mb-3" controlId="loginFormEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email..."
                required
                ref={loginEmail}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginFormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="Password"
                placeholder="Enter Password..."
                required
                ref={loginPassword}
              />
            </Form.Group>
            <Form.Group className="my-4" controlId="loginFormSubmit">
              <Stack className="align-items-center">
                <Button
                  type="submit"
                  variant="primary"
                  className={`login py-2 ${
                    windowWidth > MOBILE_BREAKPOINT ? "w-50" : "w-100"
                  }`}
                >
                  {" "}
                  Login
                </Button>
                <hr
                  className={`my-2 ${
                    windowWidth > MOBILE_BREAKPOINT ? "w-50" : "w-100"
                  } `}
                />
                <GoogleButton
                  onClick={signInWithGoogle}
                  className={`rounded ${
                    windowWidth > MOBILE_BREAKPOINT ? "w-50" : "w-100"
                  }`}
                />
              </Stack>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </MotionDiv>
  );
};

export default Login;
