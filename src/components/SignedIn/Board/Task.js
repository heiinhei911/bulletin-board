import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSignedIn } from "../../../contexts/SignedInContext";
import { useProject } from "../../../contexts/ProjectContext";
import TaskItems from "./TaskItems";
import NewTask from "./NewTask/NewTask";
import ItemPopup from "../Popup/ItemPopup/ItemPopup";
import Item from "./Item/Item";
import Sidebar from "../Popup/ItemPopup/Sidebar/Sidebar";
import DeleteToolTip from "./../DeleteToolTip";
import DeleteToast from "./DeleteToast";
import Assign from "../Popup/ItemPopup/Sidebar/PopoverContent/Assign";
import DueDate from "../Popup/ItemPopup/Sidebar/PopoverContent/DueDate";
import Priority from "../Popup/ItemPopup/Sidebar/PopoverContent/Priority";
import CopyMove from "../Popup/ItemPopup/Sidebar/PopoverContent/CopyMove";
import CardPopover from "../Popup/ItemPopup/Sidebar/CardPopover";
import Assignment from "../Popup/ItemPopup/Sidebar/Assignment";

const Task = ({ _id }) => {
  const { projects } = useSignedIn();
  const projectIndex = useProject();
  const [newTask, setNewTask] = useState(false);

  // Specialized component to pass all the necessary props to different components to avoid prop drilling
  const taskItems = projects[projectIndex].boards[_id].map((card, j) => (
    <TaskItems key={card._id} _id={card._id} content={card.content} j={j}>
      <ItemPopup
        columnId={_id}
        _id={card._id}
        comments={card.comments}
        content={card.content}
      >
        <Sidebar
          creator={card.creator}
          assignedTo={card.assignedTo}
          columnId={_id}
          _id={card._id}
        >
          <Assignment columnId={_id} _id={card._id} />
          <CardPopover>
            <Assign
              columnId={_id}
              _id={card._id}
              creator={card.creator}
              assignedTo={card.assignedTo}
              taskIndex={j}
            />
            <Priority columnId={_id} _id={card._id} taskIndex={j} />
            <DueDate columnId={_id} _id={card._id} taskIndex={j} />
            <CopyMove columnId={_id} _id={card._id} taskIndex={j} />
          </CardPopover>
          <DeleteToolTip display={card.content.title} />
          <DeleteToast display={card.content.title} />
        </Sidebar>
      </ItemPopup>
      <Item columnId={_id} content={card.content} />
    </TaskItems>
  ));

  return (
    <div className="content">
      <Droppable key={`drop-${_id}`} droppableId={_id} type="tasks">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              backgroundColor: snapshot.isDraggingOver
                ? "lightblue"
                : "#ffffff",
              borderStyle: snapshot.isDraggingOver ? "dotted" : "none",
              borderRadius: "5px",
              minHeight: "5px",
            }}
          >
            {taskItems}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <NewTask
        newTask={newTask}
        toggleNewTask={(bool) =>
          bool === true || bool === false
            ? bool
            : setNewTask((prevNewTask) => !prevNewTask)
        }
        _id={_id}
      />
    </div>
  );
};

export default Task;
