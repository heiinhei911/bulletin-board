import { useState, useRef } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { createNewProject } from "../../../helpers/updateData";
import { useSignedIn } from "../../../contexts/SignedInContext";

const NewProject = () => {
  const { setProjects, setBoards } = useSignedIn();
  const [show, setShow] = useState(false);
  const newProjNameInput = useRef("");

  const toggleShow = (bool) =>
    bool === true || bool === false
      ? setShow(bool)
      : setShow((prevShow) => !prevShow);
  const submitNewProject = (e) => {
    e.preventDefault();
    createNewProject(setProjects, setBoards, newProjNameInput.current.value);
    newProjNameInput.current.value = "";
    toggleShow();
  };

  const NewProjPopover = (
    <Popover id="new-project-popover">
      <Popover.Header as="h6">New Project Name:</Popover.Header>
      <Popover.Body className="p-2">
        <Stack direction="horizontal">
          <Form onSubmit={(e) => submitNewProject(e)} className="mx-1">
            <Form.Control
              ref={newProjNameInput}
              placeholder="Enter project name..."
              className="shadow-sm"
              autoFocus
              onBlur={() => toggleShow(false)}
            />
          </Form>
          <Button
            type="submit"
            className="mx-1"
            onClick={(e) => {
              submitNewProject(e);
              toggleShow(false);
            }}
          >
            Create
          </Button>
        </Stack>
      </Popover.Body>
    </Popover>
  );
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom-end"
      overlay={NewProjPopover}
      show={show}
    >
      <Button
        variant="primary"
        className="new-project-btn m-1 py-1 h-100"
        onClick={toggleShow}
      >
        + New Project
      </Button>
    </OverlayTrigger>
  );
};
export default NewProject;
