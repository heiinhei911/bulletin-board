import { setLocalBoards, setLocalProjects, updateBoard } from "./updateData";

const onDragEnd = (result, projects, setProjects, boards, setBoards, i) => {
  if (!result.destination) return;
  const { source, destination, type } = result;

  if (source.droppableId === destination.droppableId) {
    if (type === "column") {
      const newColumn = [...boards[i]];
      const [noteRemoved] = newColumn.splice(source.index, 1);
      newColumn.splice(destination.index, 0, noteRemoved);

      setLocalBoards(setBoards, i, newColumn);
      updateBoard(projects[i]._id, { boardOrder: newColumn });
    } else {
      const boardSelected = [...projects[i].boards[destination.droppableId]];
      const [noteRemoved] = boardSelected.splice(source.index, 1);
      boardSelected.splice(destination.index, 0, noteRemoved);

      const newColumns = { ...projects[i].boards };
      newColumns[destination.droppableId] = boardSelected;

      setLocalProjects(setProjects, i, newColumns);
      updateBoard(projects[i]._id, { boards: newColumns });
    }
  } else {
    const newColumns = { ...projects[i].boards };
    const sourceBoard = projects[i].boards[source.droppableId];
    const destBoard = projects[i].boards[destination.droppableId];
    const [noteRemoved] = sourceBoard.splice(source.index, 1);
    destBoard.splice(destination.index, 0, noteRemoved);

    newColumns[source.droppableId] = sourceBoard;
    newColumns[destination.droppableId] = destBoard;

    setLocalProjects(setProjects, i, newColumns);
    updateBoard(projects[i]._id, { boards: newColumns });
  }
};

export default onDragEnd;
