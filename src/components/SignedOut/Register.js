import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getWindowDimensions } from "../../helpers/window-dimensions";
import { NAME, DESCRIPTION, MOBILE_BREAKPOINT } from "../../defaults";
import MotionDiv from "../../helpers/animated-motion-div";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { BiArrowBack } from "react-icons/bi";
import { AiFillPushpin } from "react-icons/ai";

const Register = ({ back, login }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const registerEmail = useRef();
  const registerPassword = useRef();
  const registerPasswordConfirm = useRef();
  const registerFirstName = useRef();
  const registerLastName = useRef();
  const [loginLink, setLoginLink] = useState(false);
  const { windowWidth } = getWindowDimensions();
  const [error, setError] = useState("");

  useEffect(() => {
    if (error !== "") {
      setTimeout(() => {
        setError("");
        if (loginLink) {
          setLoginLink(false);
        }
      }, 5000);
    }
  }, [error]);

  const registerUser = async (regInfo, names) => {
    try {
      await register(regInfo, names);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setLoginLink(true);
          setError(`Email ${regInfo.email} is already in use.`);
          console.error(`Email ${regInfo.email} is already in use: `, error);
          break;
        case "auth/invalid-email":
          setError(`Email format ${regInfo.email} is invalid.`);
          console.error(`Email format ${regInfo.email} is invalid: `, error);
          break;
        case "auth/weak-password":
          setError("Password has to be 6 characters or longer.");
          console.error("Password has to be 6 characters or longer: ", error);
          break;
        default:
          setError("An error occurred. Please try again.");
          console.error(error);
          break;
      }
    }
  };

  const signUp = (e) => {
    e.preventDefault();
    if (
      registerPassword.current.value !== registerPasswordConfirm.current.value
    ) {
      return setError("Passwords do not match!");
    } else if (registerPassword.current.value.length < 6) {
      return setError("Password must be six characters or longer.");
    } else if (registerFirstName.current.value) {
      return setError("First name cannot be empty.");
    } else if (registerLastName.current.value) {
      return setError("Last name cannot be empty.");
    }
    registerUser(
      {
        email: registerEmail.current.value,
        password: registerPassword.current.value,
      },
      {
        firstName: registerFirstName.current.value,
        lastName: registerLastName.current.value,
      }
    );
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <MotionDiv className="register d-flex justify-content-center align-items-center min-vh-100">
      <Card className="vw-100">
        <Card.Body>
          <BiArrowBack size="1.5rem" className="my-1 pointer" onClick={back} />
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
              {loginLink && (
                <u className="pointer" onClick={login}>
                  Login here
                </u>
              )}
            </Alert>
          )}
          <Form className="credentials px-5 my-3" onSubmit={(e) => signUp(e)}>
            <Form.Group className="mb-3" controlId="signUpFormEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email..."
                required
                ref={registerEmail}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="signUpFormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="Password"
                placeholder="Enter Password..."
                required
                ref={registerPassword}
              />
              <Form.Text className="text-muted">
                Password has to be six characters or longer.
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="credentialsFormPasswordConfirm"
            >
              <Form.Label>Confirm your Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password Again..."
                required
                ref={registerPasswordConfirm}
              />
            </Form.Group>
            <hr />
            <Form.Group className="mb-3" controlId="signUpFormFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="First Name"
                placeholder="Enter your first name..."
                required
                ref={registerFirstName}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="signUpFormLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="Last Name"
                placeholder="Enter your last name..."
                required
                ref={registerLastName}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="my-4" controlId="registerFormSubmit">
              <Button
                type="submit"
                variant="primary"
                className={`register py-2 d-block m-auto ${
                  windowWidth > MOBILE_BREAKPOINT ? "w-50" : "w-100"
                }`}
              >
                {" "}
                Register
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </MotionDiv>
  );
};

export default Register;
