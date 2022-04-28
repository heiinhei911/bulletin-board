import { Droppable } from "react-beautiful-dnd";
import { useSignedIn } from "../../../contexts/SignedInContext";
import Drag from "./Drag";

const Drop = (props) => {
  const { project, i, board } = props;
  const { projects, boards } = useSignedIn();

  const dropsBoard = boards[i].map((board, j) => (
    <Drag key={board._id} _id={board._id} board={board} i={i} j={j} />
  ));

  // const dropsCard = projects[i].boards[board?._id].map((board, j) => (
  //   <Drag
  //     key={board._id}
  //     _id={board._id}
  //     content={board.content}
  //     board={board}
  //     i={i}
  //     j={j}
  //   />
  // ));

  return (
    <Droppable
      className="w-100"
      key={board ? board._id : "project._id"}
      droppableId={board ? board._id.toString() : "project._id".toString()}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            background: snapshot.isDraggingOver ? "lightblue" : "white",
          }}
        >
          {board
            ? projects[i].boards[board._id].map((b, j) => (
                <Drag
                  key={b._id}
                  _id={b._id}
                  content={b.content}
                  board={b}
                  i={i}
                  j={j}
                />
              ))
            : dropsBoard}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Drop;
