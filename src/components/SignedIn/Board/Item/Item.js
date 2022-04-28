import { useEffect, useState } from "react";
import { useSignedIn } from "../../../../contexts/SignedInContext";
import { useProject } from "../../../../contexts/ProjectContext";
import { priorityTagColorDisplay } from "../../../../helpers/item-display";
import Stack from "react-bootstrap/Stack";
import "./Item.scss";

const Item = ({ columnId, content }) => {
  const { boards } = useSignedIn();
  const projectIndex = useProject();
  const [doneColumn, setDoneColumn] = useState(false);

  useEffect(() => {
    let done_id = "";

    for (let i = 0; i < 2; i++) {
      boards[projectIndex].forEach((board) => {
        if (board.name === "done") {
          done_id = board._id;
        }
        if (columnId === done_id) {
          setDoneColumn(true);
        }
      });
    }
  }, []);

  return (
    <Stack
      direction="horizontal"
      className="task justify-content-start align-items-stretch"
    >
      <div className={`tag ${priorityTagColorDisplay(content.priority)}`}></div>
      <h4
        className={`${
          doneColumn && "text-black-50"
        } py-2 py-md-1 mb-0 mx-1 h6 w-100`}
        style={{ textDecoration: doneColumn ? "line-through" : "none" }}
      >
        {content.title}
      </h4>
    </Stack>
  );
};

export default Item;
