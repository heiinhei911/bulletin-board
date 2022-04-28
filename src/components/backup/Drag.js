import { Draggable } from "react-beautiful-dnd";
import Drop from "./Drop";
import { nanoid } from "nanoid";

const expandCard = (e) => {
  e.preventDefault();
  console.log("clicked");
};

const Drag = (props) => {
  const { _id, content, board, i, j } = props;
  const drops = <Drop key={_id} board={board} i={i} />;

  return (
    <Draggable key={_id} draggableId={_id.toString()} index={j}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // className="p-1 m-2 rounded border"
          // onClick={(e) => expandCard(e)}
          style={{
            userSelect: "none",
            backgroundColor: snapshot.isDragging ? "lightgray" : "whitesmoke",
            borderColor: snapshot.isDragging ? "#dee2e6" : "whitesmoke",
            ...provided.draggableProps.style,
          }}
        >
          {content
            ? [
                <h2 key={nanoid()}>{content.title}</h2>,
                <p key={nanoid()}>{content.description}</p>,
              ]
            : [
                <h3 className="p-1 px-2" key={nanoid()}>
                  {board.display}
                </h3>,
                <div className="content" key={nanoid()}>
                  {drops}
                </div>,
              ]}
          {/* {content.priority && <p>{content.priority}</p>} */}
        </div>
      )}
    </Draggable>
  );
};

export default Drag;
