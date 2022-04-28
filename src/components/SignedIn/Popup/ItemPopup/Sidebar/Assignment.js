import { useState } from "react";
import { useSignedIn } from "../../../../../contexts/SignedInContext";
import { useProject } from "../../../../../contexts/ProjectContext";
import NameDisplay from "../../../NameDisplay";
import { removeAssign } from "../../../../../helpers/updateData";
import Stack from "react-bootstrap/Stack";
import { MdClose } from "react-icons/md";

const Assignment = ({ columnId, _id, assignee }) => {
  const { projects, setProjects } = useSignedIn();
  const projectIndex = useProject();
  const [hover, setHover] = useState(false);

  return (
    <Stack
      direction="horizontal"
      className="justify-content-between"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <NameDisplay uid={assignee} classes="my-1" />
      {hover && (
        <div
          className="remove-assignee pointer"
          onClick={() => {
            removeAssign(
              projects,
              setProjects,
              columnId,
              _id,
              assignee,
              projectIndex
            );
            setHover(false);
          }}
        >
          <MdClose size="1rem" color={hover ? "#808080" : "#d3d3d3"} />
        </div>
      )}
    </Stack>
  );
};
export default Assignment;
