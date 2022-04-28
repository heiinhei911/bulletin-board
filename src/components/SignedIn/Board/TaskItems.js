import { cloneElement, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { priorityCardBorderDisplay } from "../../../helpers/item-display";

const TaskItems = ({ _id, content, j, children }) => {
  const [itemPopup, setItemPopup] = useState(false);

  const toggleItemPopup = (e) => {
    if (e) {
      e.preventDefault();
    }
    setItemPopup((prevItemPopup) => !prevItemPopup);
  };

  return (
    <>
      <Draggable key={`drag-${_id}`} draggableId={_id.toString()} index={j}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${priorityCardBorderDisplay(content.priority)} my-2 
            rounded border`}
            onClick={(e) => toggleItemPopup(e)}
            style={{
              userSelect: "none",
              cursor: snapshot.isDragging ? "drag" : "pointer",
              backgroundColor: snapshot.isDragging ? "lightgray" : "#ffffff",
              ...provided.draggableProps.style,
            }}
          >
            {/* Item */}
            {children[1]}
          </div>
        )}
      </Draggable>

      {itemPopup &&
        cloneElement(children[0], {
          itemPopup: itemPopup,
          toggleItemPopup: toggleItemPopup,
        })}
    </>
  );
};

export default TaskItems;
