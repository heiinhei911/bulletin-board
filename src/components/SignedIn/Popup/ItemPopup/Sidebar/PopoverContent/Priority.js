import { useState, useEffect } from "react";
import { useSignedIn } from "../../../../../../contexts/SignedInContext";
import { useProject } from "../../../../../../contexts/ProjectContext";
import { getWindowDimensions } from "../../../../../../helpers/window-dimensions";
import { MOBILE_BREAKPOINT } from "../../../../../../defaults";
import { updateCard } from "../../../../../../helpers/updateData";
import Form from "react-bootstrap/Form";
import { nanoid } from "nanoid";

const Priority = ({
  columnId,
  _id,
  taskIndex,
  togglePostActions,
  populateDetails,
}) => {
  const { projects, setProjects } = useSignedIn();
  const projectIndex = useProject();
  const { windowWidth } = getWindowDimensions();
  const [priority, setPriority] = useState(0);
  const [prevPriority, setPrevPriority] = useState(0);
  const columns = projects[projectIndex].boards[columnId];
  const priorityList = ["High", "Medium", "Low"];

  useEffect(() => {
    columns.map((column) => {
      if (column._id === _id) {
        setPriority(column.content.priority);
        setPrevPriority(column.content.priority);
      }
      return column;
    });
  }, []);

  useEffect(() => {
    if (prevPriority !== priority) {
      const priorityConvert = (priorityIndex) => {
        switch (priorityIndex) {
          case 1:
            return priorityList[0];
          case 2:
            return priorityList[1];
          case 3:
            return priorityList[2];
          default:
            return priorityIndex;
        }
      };

      updateCard(
        projects,
        setProjects,
        columnId,
        _id,
        "priority",
        parseInt(priority),
        projectIndex
      );
      populateDetails({
        cardName: columns[taskIndex].content.title,
        oldPriority: priorityConvert(prevPriority),
        newPriority: priorityConvert(priority),
      });
      setPrevPriority(priority);
      togglePostActions(true);
    }
  }, [priority]);

  return priorityList.map((priorityLabel, i) => (
    <Form.Check
      key={nanoid()}
      type="radio"
      name="priorityTypes"
      label={priorityLabel}
      className={`${
        windowWidth < MOBILE_BREAKPOINT ? "h5 mb-0" : ""
      } m-1 m-md-0 py-1 py-md-0 text-left`}
      value={i + 1}
      checked={parseInt(priority) === i + 1}
      id={`priorityTypes-${i + 1}`}
      onChange={(e) => setPriority(parseInt(e.target.value))}
    />
  ));
};

export default Priority;
