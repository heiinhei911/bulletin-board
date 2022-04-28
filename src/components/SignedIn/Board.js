import { useState } from "react";
import { ProjectProvider } from "../../contexts/ProjectContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSignedIn } from "../../contexts/SignedInContext";
import { getWindowDimensions } from "../../helpers/window-dimensions";
import { MOBILE_BREAKPOINT } from "../../defaults";
import { updateProjectName } from "../../helpers/updateData";
import Edit from "./Board/Edit";
import MotionDiv from "../../helpers/animated-motion-div";
import Canvas from "./Board/Canvas";
import NewColumn from "./Popup/NewColumn";
import onDragEnd from "../../helpers/dnd.js";
import { DragDropContext } from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";

const Board = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { project_id } = useParams();

  const { user } = useAuth();
  const { projects, setProjects, boards, setBoards } = useSignedIn();
  const { windowWidth } = getWindowDimensions();
  const [column, setColumn] = useState(false);

  if (
    !state ||
    project_id !== projects[state.projectIndex]._id ||
    state.projectIndex > projects.length
  ) {
    console.log("unknown");
    return navigate("/*");
  }

  const canvas = <Canvas key={projects[state.projectIndex]._id} />;
  const toggleColumn = () => setColumn((prevColumn) => !prevColumn);

  return (
    <ProjectProvider projectIndex={state.projectIndex}>
      <MotionDiv className="board p-2">
        {user.uid === process.env.REACT_APP_DEMO_UID && (
          <Alert className="py-2 text-center">
            You are currently in demo mode. Any changes that you make will not
            be saved to the database.
          </Alert>
        )}
        <Stack direction="horizontal" className="justify-content-between">
          <Edit
            thing="project-name"
            display={projects[state.projectIndex].display}
            pin={true}
            leftMargin={true}
            h={windowWidth < MOBILE_BREAKPOINT ? "h2" : "h3"}
            submitFunction={(value) =>
              updateProjectName(
                projects,
                setProjects,
                value,
                state.projectIndex
              )
            }
          />
          <Button className="new-column-btn" onClick={toggleColumn}>
            + New Column
          </Button>
        </Stack>
        <div className="tasks">
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(
                result,
                projects,
                setProjects,
                boards,
                setBoards,
                state.projectIndex
              )
            }
          >
            <div className="canvas w-100 my-1">{canvas}</div>
          </DragDropContext>
        </div>
        <NewColumn column={column} toggleColumn={toggleColumn} />
      </MotionDiv>
    </ProjectProvider>
  );
};

export default Board;
