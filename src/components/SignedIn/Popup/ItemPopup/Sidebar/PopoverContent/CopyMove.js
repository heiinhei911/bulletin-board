import { useProject } from "../../../../../../contexts/ProjectContext";
import { useSignedIn } from "../../../../../../contexts/SignedInContext";
import { duplicateCard } from "../../../../../../helpers/updateData";
import { getWindowDimensions } from "../../../../../../helpers/window-dimensions";
import { MOBILE_BREAKPOINT } from "../../../../../../defaults";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Stack from "react-bootstrap/Stack";
import onDragEnd from "../../../../../../helpers/dnd";

const CopyMove = ({
  columnId,
  _id,
  taskIndex,
  type,
  togglePostActions,
  populateDetails,
}) => {
  const { projects, boards, setProjects, setBoards } = useSignedIn();
  const projectIndex = useProject();
  const { windowWidth } = getWindowDimensions();
  let columnIndex = 0;
  const columns = projects[projectIndex].boards[columnId];

  for (const j in boards[projectIndex]) {
    if (boards[projectIndex][j]._id === columnId) {
      columnIndex = j;
      break;
    }
  }

  const submitCopyMove = (boardId, destination) => {
    if (type === "move") {
      // Move
      onDragEnd(
        {
          source: { droppableId: columnId, index: taskIndex },
          destination: { droppableId: boardId, index: 0 },
          type: "tasks",
        },
        projects,
        setProjects,
        boards,
        setBoards,
        projectIndex
      );
      populateDetails({
        cardName: columns[0].content.title,
        from: boards[projectIndex][columnIndex].display,
        to: destination,
      });
    } else {
      // Copy
      duplicateCard(
        projects,
        setProjects,
        columnId,
        _id,
        boardId,
        projectIndex
      );
      populateDetails({
        cardName:
          columns[columnId === boardId ? taskIndex + 1 : taskIndex].content
            .title,
        to: destination,
      });
    }
    togglePostActions(true);
  };

  return (
    <>
      <h4
        className={`${
          windowWidth < MOBILE_BREAKPOINT ? "h4" : "h6"
        } mx-2 mx-md-1 text-left`}
      >
        {type === "copy" ? "Copy" : "Move"} this card from{" "}
        <span className="text-warning">
          {boards[projectIndex][columnIndex].display}
        </span>{" "}
        to:
      </h4>
      <ListGroup className="shadow-sm">
        {boards[projectIndex].map((board) => {
          if ((type === "move" && board._id !== columnId) || type === "copy") {
            return (
              <ListGroupItem
                key={board._id}
                className={`${
                  windowWidth < MOBILE_BREAKPOINT ? "h5 mb-0" : ""
                } pointer py-md-1 mx-1 text-left hover`}
                onClick={() => submitCopyMove(board._id, board.display)}
              >
                <Stack
                  direction="horizontal"
                  className="justify-content-between"
                >
                  <p className="mb-0">{board.display}</p>
                  <p className="mb-0 text-muted">
                    {projects[projectIndex].boards[board._id].length}
                  </p>
                </Stack>
              </ListGroupItem>
            );
          }
          return null;
        })}
      </ListGroup>
    </>
  );
};
export default CopyMove;
