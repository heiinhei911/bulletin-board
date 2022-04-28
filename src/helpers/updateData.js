import { createDbProject, removeDbDoc, updateDbField } from "./firebase-crud";
import { arrayUnion } from "firebase/firestore";
import { nanoid } from "nanoid";

const updateBoard = (projectId, newBoard) => {
  updateDbField("projects", projectId, newBoard);
};

const setLocalBoards = (setBoards, i, newBoard) => {
  setBoards((prevBoards) =>
    prevBoards.map((prevBoard, j) => {
      if (i === j) {
        return newBoard;
      }
      return prevBoard;
    })
  );
};

const setLocalProjects = (setProjects, i, newBoards) => {
  setProjects((prevProjects) =>
    prevProjects.map((prevProject, j) => {
      if (i === j) {
        return {
          ...prevProject,
          boards: newBoards,
        };
      }
      return prevProject;
    })
  );
};

const createNewProject = (setProjects, setBoards, display) => {
  const newId = nanoid();
  const newProjDbObj = {
    boardOrder: [],
    boards: {},
    display,
    name: display.split(" ").join("").toLowerCase(),
  };
  const newLocalProjObj = {
    boards: {},
    display,
    name: display.split(" ").join("").toLowerCase(),
    _id: newId,
  };
  setProjects((prevProjects) => [...prevProjects, newLocalProjObj]);
  setBoards((prevBoards) => [...prevBoards, []]);
  createDbProject(newId, newProjDbObj);
};

const updateColumnName = (
  projects,
  boards,
  setBoards,
  columnId,
  newColName,
  i
) => {
  const newColumn = [...boards[i]].map((column) => {
    if (column._id === columnId) {
      column.display = newColName;
      column.name = newColName.split(" ").join("").toLowerCase();
    }
    return column;
  });

  setLocalBoards(setBoards, i, newColumn);
  updateBoard(projects[i]._id, { boardOrder: newColumn });
};

const updateCard = (
  projects,
  setProjects,
  columnId,
  _id,
  type,
  newValue,
  i,
  uid
) => {
  const newBoard = [...projects[i].boards[columnId]].map((task) => {
    if (task._id === _id) {
      switch (type) {
        case "description":
          task.content.description = newValue;
          break;
        case "title":
          task.content.title = newValue;
          break;
        case "priority":
          task.content.priority = newValue;
          break;
        case "comment":
          task.comments.push({
            comment: newValue,
            commentor: uid,
            _id: nanoid(),
          });
          break;
        case "assign":
          task.assignedTo.push(newValue);
          break;
        default:
          break;
      }
    }
    return task;
  });

  const newBoards = { ...projects[i].boards };
  newBoards[columnId] = newBoard;
  setLocalProjects(setProjects, i, newBoards);
  updateBoard(projects[i]._id, { boards: newBoards });
};

const updateProjectName = (projects, setProjects, newProjectName, i) => {
  const newProject = { ...projects[i] };
  const newName = newProjectName.split(" ").join("").toLowerCase();
  newProject.display = newProjectName;
  newProject.name = newName;

  setProjects((prevProjects) =>
    prevProjects.map((prevProject, j) => {
      if (i === j) {
        return newProject;
      }
      return prevProject;
    })
  );
  updateBoard(projects[i]._id, { name: newName });
  updateBoard(projects[i]._id, { display: newProjectName });
};

const duplicateCard = (
  projects,
  setProjects,
  columnId,
  _id,
  targetColumnId,
  i
) => {
  const newBoards = { ...projects[i].boards };

  for (const task of newBoards[columnId]) {
    if (task._id === _id) {
      newBoards[targetColumnId].unshift({ ...task, _id: nanoid() });
      break;
    }
  }
  setLocalProjects(setProjects, i, newBoards);
  updateBoard(projects[i]._id, { boards: newBoards });
};

const postNewComment = (
  projects,
  setProjects,
  columnId,
  _id,
  newComment,
  uid,
  i
) => {
  const newBoard = [...projects[i].boards[columnId]].map((task) => {
    if (task._id === _id) {
      task.comments.push({
        comment: newComment,
        commentor: uid,
        _id: nanoid(),
      });
      // CreatedAt
    }
    return task;
  });

  const newBoards = { ...projects[i].boards };
  newBoards[columnId] = newBoard;

  setLocalProjects(setProjects, i, newBoards);
  updateBoard(projects[i]._id, { boards: newBoards });
};

const createNewTaskItem = (
  projects,
  setProjects,
  _id,
  newTaskInput,
  uid,
  i
) => {
  const newColumn = { ...projects[i].boards };

  newColumn[_id].push({
    _id: nanoid(),
    creator: uid,
    assignedTo: [],
    comments: [],
    createdAt: 0,
    content: {
      title: newTaskInput,
      description: "",
      priority: 3,
    },
  });

  setLocalProjects(setProjects, i, newColumn);
  updateBoard(projects[i]._id, { boards: newColumn });
};

const newColumn = (
  projects,
  setProjects,
  setBoards,
  columnName,
  newContent,
  uid,
  i
) => {
  const newColumnId = nanoid();
  const newColumn = { ...projects[i].boards };
  const newColumnOrder = {
    _id: newColumnId,
    display: columnName,
    name: columnName.split(" ").join("").toLowerCase(),
  };

  if (
    newContent.title === "" &&
    newContent.description === "" &&
    newContent.priority === 0
  ) {
    newColumn[newColumnId] = [];
  } else {
    newColumn[newColumnId] = [
      {
        _id: nanoid(),
        creator: uid,
        assignedTo: [],
        comments: [],
        createdAt: 0,
        content: {
          title: newContent.title,
          description: newContent.description,
          priority: parseInt(newContent.priority),
        },
      },
    ];
  }

  setBoards((prevBoards) =>
    prevBoards.map((prevBoard, j) => {
      if (j === i) {
        return [...prevBoard, newColumnOrder];
      }
      return prevBoard;
    })
  );
  setProjects((prevProjects) =>
    prevProjects.map((prevProject, j) => {
      if (j === i) {
        return { ...prevProject, boards: newColumn };
      }
      return prevProject;
    })
  );
  updateBoard(projects[i]._id, { boardOrder: arrayUnion(newColumnOrder) });
  updateBoard(projects[i]._id, { boards: newColumn });
};

const removeCard = (projects, setProjects, columnId, _id, i) => {
  const newColumn = { ...projects[i].boards };

  newColumn[columnId].forEach((task, j) => {
    if (task._id === _id) {
      newColumn[columnId].splice(j, 1);
    }
  });
  setLocalProjects(setProjects, i, newColumn);
  updateBoard(projects[i]._id, { boards: newColumn });
};

const removeColumn = (
  projects,
  setProjects,
  boards,
  setBoards,
  columnId,
  i
) => {
  const newColumn = { ...projects[i].boards };
  const newBoardOrder = [...boards[i]];

  delete newColumn[columnId];
  newBoardOrder.forEach((board, j) => {
    if (board._id === columnId) {
      newBoardOrder.splice(j, 1);
    }
  });

  setLocalBoards(setBoards, i, newBoardOrder);
  setLocalProjects(setProjects, i, newColumn);
  updateBoard(projects[i]._id, { boardOrder: newBoardOrder });
  updateBoard(projects[i]._id, { boards: newColumn });
};

const removeAssign = (projects, setProjects, columnId, _id, assignee, i) => {
  const newBoard = [...projects[i].boards[columnId]].map((task) => {
    if (task._id === _id) {
      if (task.assignedTo.includes(assignee)) {
        task.assignedTo.splice(task.assignedTo.indexOf(assignee), 1);
      }
    }
    return task;
  });

  const newBoards = { ...projects[i].boards };
  newBoards[columnId] = newBoard;
  setLocalProjects(setProjects, i, newBoards);
  updateBoard(projects[i]._id, { boards: newBoards });
};

const removeProject = (setProjects, setBoards, projectId, i) => {
  console.log(i);
  setProjects((prevProjects) => {
    const newPrevProjects = [...prevProjects];
    newPrevProjects.splice(i, 1);
    return newPrevProjects;
  });
  setBoards((prevBoards) => {
    const newPrevBoards = [...prevBoards];
    newPrevBoards.splice(i, 1);
    return newPrevBoards;
  });
  removeDbDoc("projects", projectId);
};

export {
  updateBoard,
  setLocalBoards,
  setLocalProjects,
  createNewProject,
  newColumn,
  removeColumn,
  removeCard,
  removeAssign,
  removeProject,
  updateColumnName,
  updateProjectName,
  updateCard,
  duplicateCard,
  createNewTaskItem,
  postNewComment,
};
