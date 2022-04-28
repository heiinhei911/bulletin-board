import { useState } from "react";
import { useSignedIn } from "../../../contexts/SignedInContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useProject } from "../../../contexts/ProjectContext";
import MotionDiv from "../../../helpers/animated-motion-div";
import { newColumn } from "../../../helpers/updateData";
import { contentDefault } from "../../../defaults";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { MdViewColumn } from "react-icons/md";
import { nanoid } from "nanoid";

const NewColumn = ({ column, toggleColumn }) => {
  const { user } = useAuth();
  const { projects, setProjects, setBoards } = useSignedIn();
  const projectIndex = useProject();
  const [columnName, setColumnName] = useState("");
  const [newContent, setNewContent] = useState(contentDefault);
  const [error, setError] = useState("");

  const updateNewContent = (value, prop) =>
    setNewContent((prevNewContent) => {
      const newContentObj = { ...prevNewContent };
      newContentObj[prop] = value;

      if (
        newContentObj.priority === 0 &&
        (newContentObj.title !== "" || newContentObj.description !== "")
      ) {
        newContentObj["priority"] = 3;
      } else if (
        newContentObj.priority !== 0 &&
        newContentObj.title === "" &&
        newContentObj.description === ""
      ) {
        newContentObj["priority"] = 0;
      }
      return newContentObj;
    });

  const submitNewContent = () => {
    if (columnName === "") {
      setError("Name of the new column cannot be empty.");
      return setTimeout(() => setError(""), 3000);
    }

    newColumn(
      projects,
      setProjects,
      setBoards,
      columnName,
      newContent,
      user.uid,
      projectIndex
    );
    setColumnName("");
    setNewContent(contentDefault);
    toggleColumn();
  };

  return (
    <Modal show={column} onHide={toggleColumn} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal">
            <MdViewColumn size="2rem" />
            <h3 className="mb-0">Set Up a New Column</h3>
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <MotionDiv>
            <Alert variant="danger" className="px-2 py-1">
              {error}
            </Alert>
          </MotionDiv>
        )}
        <Form>
          <Form.Group className="mx-1 my-2" controlId="newContentFormName">
            <Form.Label>Name of new column:*</Form.Label>
            <Form.Control
              placeholder="Enter Name..."
              className="shadow-sm mb-3"
              value={columnName}
              required
              onChange={(e) => setColumnName(e.target.value)}
            />
            <hr className="my-2" />
          </Form.Group>
          <Form.Group className="mx-1" controlId="newContentFormNewTask">
            <Form.Label className="my-0">Add a task (Optional):</Form.Label>
            <Form.Group className="mx-1 my-2" controlId="newContentFormTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                placeholder="Enter title..."
                className="shadow-sm"
                value={newContent.title}
                onChange={(e) => updateNewContent(e.target.value, "title")}
              />
            </Form.Group>
            <Form.Group
              className="mx-1 my-2"
              controlId="newContentFormDescription"
            >
              <Form.Label>Description:</Form.Label>
              <Form.Control
                placeholder="Enter description..."
                as="textarea"
                className="shadow-sm"
                value={newContent.description}
                onChange={(e) =>
                  updateNewContent(e.target.value, "description")
                }
              />
            </Form.Group>
            <Form.Group
              className="mx-1 my-2"
              controlId="newContentFormPriority"
            >
              <Form.Label>Priority:</Form.Label>
              <div className="priority-checkbox">
                {["High", "Medium", "Low"].map((priorityLabel, i) => (
                  <Form.Check
                    key={nanoid()}
                    inline
                    type="radio"
                    name="priorityTypes"
                    label={priorityLabel}
                    value={i + 1}
                    checked={parseInt(newContent.priority) === i + 1}
                    id={`priorityTypes-${i + 1}`}
                    onChange={(e) =>
                      updateNewContent(e.target.value, "priority")
                    }
                  />
                ))}
              </div>
            </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-between align-items-start">
        <p className="text-muted mr-auto">
          All fields marked with asterisks(*) are required.
        </p>
        <Button onClick={submitNewContent}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewColumn;
