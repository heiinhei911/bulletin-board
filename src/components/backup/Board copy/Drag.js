import { Draggable } from "react-beautiful-dnd";

const expandCard = (e) => {
  e.preventDefault();
  console.log("clicked");
};

const Drag = ({ _id, content, j }) => {
  return (
    <Draggable key={_id} draggableId={_id.toString()} index={j}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-1 m-1 rounded border"
          onClick={(e) => expandCard(e)}
          style={{
            userSelect: "none",
            backgroundColor: snapshot.isDragging ? "lightgray" : "whitesmoke",
            borderColor: snapshot.isDragging ? "#dee2e6" : "whitesmoke",
            ...provided.draggableProps.style,
          }}
        >
          <h2>{content.title}</h2>
          <p>{content.description}</p>
          {content.priority && <p>{content.priority}</p>}
        </div>
      )}
    </Draggable>
  );
};

export default Drag;
