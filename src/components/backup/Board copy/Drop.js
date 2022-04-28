import { Droppable } from "react-beautiful-dnd";
import Drag from "./Drag";

const Drop = ({ project, board }) => {
  const cards = project.boards[board._id].map((card, j) => (
    <Drag key={card._id} _id={card._id} content={card.content} j={j} />
  ));

  return (
    <div className={`${board.name} rounded p-1 shadow my-2 w-100 mx-lg-2`}>
      <h3 className="mx-2 my-1">{board.display}</h3>
      <Droppable key={board._id} droppableId={board._id.toString()}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : "white",
            }}
          >
            {cards}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Drop;
