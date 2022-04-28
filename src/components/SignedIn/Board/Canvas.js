import { Droppable } from "react-beautiful-dnd";
import { useProject } from "../../../contexts/ProjectContext";
import { useSignedIn } from "../../../contexts/SignedInContext";
import { MOBILE_BREAKPOINT } from "../../../defaults";
import { getWindowDimensions } from "../../../helpers/window-dimensions";
import TaskColumn from "./TaskColumn/TaskColumn";
import Stack from "react-bootstrap/Stack";

const Canvas = () => {
  const projectIndex = useProject();
  const { projects, boards } = useSignedIn();
  const { windowWidth } = getWindowDimensions();

  const taskColumn = boards[projectIndex].map((board, j) => (
    <TaskColumn
      key={board._id}
      _id={board._id}
      name={board.name}
      display={board.display}
      j={j}
    />
  ));

  return (
    <Droppable
      key={`drop-${projects[projectIndex]._id}`}
      droppableId={projects[projectIndex]._id.toString()}
      direction={windowWidth > MOBILE_BREAKPOINT ? "horizontal" : "vertical"}
      type="column"
    >
      {(provided, snapshot) => (
        <Stack
          direction={
            windowWidth > MOBILE_BREAKPOINT ? "horizontal" : "vertical"
          }
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`align-items-center justify-content-md-start align-items-md-start mw-100 ${
            windowWidth > MOBILE_BREAKPOINT ? "flex-nowrap" : "flex-wrap"
          }`}
          style={{
            background: snapshot.isDraggingOver ? "lightblue" : "#f5f5f5",
            borderStyle: snapshot.isDraggingOver ? "dotted" : "none",
          }}
        >
          {taskColumn}
          {provided.placeholder}
        </Stack>
      )}
    </Droppable>
  );
};

export default Canvas;
