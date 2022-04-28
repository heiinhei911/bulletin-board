import { useRef } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useSignedIn } from "../../../../contexts/SignedInContext";
import { useProject } from "../../../../contexts/ProjectContext";
import { createNewTaskItem } from "../../../../helpers/updateData";
import MotionDiv from "../../../../helpers/animated-motion-div";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import "./NewTask.scss";

const NewTask = ({ newTask, toggleNewTask, _id }) => {
  const { user } = useAuth();
  const { projects, setProjects } = useSignedIn();
  const projectIndex = useProject();
  const newTaskInput = useRef("");

  const submitNewTaskItem = (e) => {
    e.preventDefault();
    if (newTaskInput.current.value !== "") {
      createNewTaskItem(
        projects,
        setProjects,
        _id,
        newTaskInput.current.value,
        user.uid,
        projectIndex
      );
      newTaskInput.current.value = "";
    }
    newTaskInput.current.blur();
    toggleNewTask(false);
  };

  return (
    <MotionDiv
      className={`newtask ${!newTask ? "border-dotted px-2" : ""}
      py-2 py-md-1 my-2 rounded pointer`}
      onClick={toggleNewTask}
      onBlur={toggleNewTask}
    >
      {newTask ? (
        <Form onSubmit={(e) => submitNewTaskItem(e)}>
          <Form.Control
            as="input"
            ref={newTaskInput}
            className="newtask-input"
            placeholder="Describe your task..."
            maxLength={80}
            autoFocus
          />
        </Form>
      ) : (
        <Stack direction="horizontal" className="newtask-placeholder">
          <p className="mb-0 h6">+</p>
          <p className="mb-0 mx-2 h6">New Task</p>
        </Stack>
      )}
    </MotionDiv>
  );
};

export default NewTask;
