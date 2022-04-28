import { getWindowDimensions } from "../../../../helpers/window-dimensions";
import { MOBILE_BREAKPOINT } from "../../../../defaults";
import { Draggable } from "react-beautiful-dnd";
import Task from "../Task";
import ColumnHeader from "./ColumnHeader";

const TaskColumn = ({ _id, name, display, j }) => {
  const { windowWidth } = getWindowDimensions();

  const task = <Task key={_id} _id={_id} />;

  return (
    <Draggable key={`drag-${_id}`} draggableId={_id.toString()} index={j}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${name} ${
            windowWidth < MOBILE_BREAKPOINT ? "w-100" : ""
          } px-2 py-1 rounded my-2 mx-md-1`}
          style={{
            userSelect: "none",
            cursor: snapshot.isDragging ? "drag" : "default",
            backgroundColor: snapshot.isDragging ? "lightgray" : "#ffffff",
            width: "325px",
            ...provided.draggableProps.style,
          }}
        >
          <ColumnHeader _id={_id} display={display} />
          {task}
        </div>
      )}
    </Draggable>
  );
};

export default TaskColumn;
