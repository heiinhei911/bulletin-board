import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { NAME } from "../../../defaults";
import NameDisplay from "../NameDisplay";
import Avator from "../Avator/Avator";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./Nav.scss";

const Nav = () => {
  const { user, logout } = useAuth();

  const AvatorPopover = (
    <Popover id="avator-popover">
      <Popover.Header>
        <NameDisplay uid={user.uid} avator={false} />
      </Popover.Header>
      <Popover.Body className="py-2">
        <Stack>
          <h4 className="h6 mb-0 text-black-50 pointer" onClick={logout}>
            Logout
          </h4>
        </Stack>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar className="banner shadow-sm">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="logo text-decoration-none text-dark">
            {NAME}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <OverlayTrigger
              trigger="click"
              placement="bottom-end"
              overlay={AvatorPopover}
              rootClose
            >
              <Button
                variant="link"
                className="nav-avator p-0 text-decoration-none"
              >
                <Avator uid={user.uid} className="pointer" />
              </Button>
            </OverlayTrigger>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav;
