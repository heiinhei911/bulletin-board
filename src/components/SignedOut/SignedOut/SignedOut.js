import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { getWindowDimensions } from "../../../helpers/window-dimensions";
import { MOBILE_BREAKPOINT } from "../../../defaults";
import SignedOutColumns from "../SignedOutColumns";
import MotionDiv from "../../../helpers/animated-motion-div";
import { NAME } from "../../../defaults";
import Login from "../Login";
import Register from "../Register";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { AiFillPushpin } from "react-icons/ai";
import "./SignedOut.scss";

const SignedOut = () => {
  const { login } = useAuth();
  const { windowWidth } = getWindowDimensions();
  const navigate = useNavigate();
  const [type, setType] = useState("");

  const chooseType = (type) => {
    switch (type) {
      case "login":
        return setType("login");
      case "register":
        return setType("register");
      default:
        return;
    }
  };

  const loginDemoUser = () => {
    login({
      email: process.env.REACT_APP_DEMO_EMAIL,
      password: process.env.REACT_APP_DEMO_PASSWORD,
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Container className="signed-out min-vh-100">
      {type === "" ? (
        <MotionDiv className="register-login text-center">
          <Stack direction="vertical" className="align-items-center">
            <h1
              style={
                windowWidth > MOBILE_BREAKPOINT
                  ? {
                      marginTop: "8rem",
                      marginBottom: "3rem",
                    }
                  : { marginTop: "1.5rem" }
              }
            >
              {NAME}
              <AiFillPushpin className="pin" color="#D11A2A" />
            </h1>

            <Stack
              direction={
                windowWidth > MOBILE_BREAKPOINT ? "horizontal" : "vertical"
              }
              className="justify-content-start align-items-center justify-content-md-between align-items-md-start"
            >
              <SignedOutColumns
                chooseType={(type) => chooseType(type)}
                loginDemoUser={loginDemoUser}
              />
            </Stack>
          </Stack>
        </MotionDiv>
      ) : type === "login" ? (
        <Login back={() => setType("")} register={() => setType("register")} />
      ) : (
        <Register back={() => setType("")} login={() => setType("login")} />
      )}
    </Container>
  );
};

export default SignedOut;
