import { useAuth } from "../../../../../../contexts/AuthContext";
import { useSignedIn } from "../../../../../../contexts/SignedInContext";
import { useProject } from "../../../../../../contexts/ProjectContext";
import { getWindowDimensions } from "../../../../../../helpers/window-dimensions";
import { MOBILE_BREAKPOINT } from "../../../../../../defaults";
import ListGroup from "react-bootstrap/ListGroup";
import NameDisplay from "../../../../NameDisplay";
import { updateCard } from "../../../../../../helpers/updateData";
import Stack from "react-bootstrap/Stack";

const Assign = ({
  columnId,
  _id,
  creator,
  assignedTo,
  taskIndex,
  togglePostActions,
  populateDetails,
}) => {
  const { user } = useAuth();
  const { projects, setProjects, users } = useSignedIn();
  const projectIndex = useProject();
  const { windowWidth } = getWindowDimensions();

  const submitAssign = (userId) => {
    updateCard(
      projects,
      setProjects,
      columnId,
      _id,
      "assign",
      userId,
      projectIndex
    );
    togglePostActions(true);
    populateDetails({
      assignee: userId,
      cardName:
        projects[projectIndex].boards[columnId][taskIndex].content.title,
    });
  };

  return (
    <>
      <h4
        className={`${
          windowWidth < MOBILE_BREAKPOINT ? "h4" : "h6"
        } mx-1 text-left`}
      >
        List of all users:
      </h4>
      <ListGroup className="shadow-sm">
        {users.map((listUser) => {
          if (!assignedTo.includes(listUser._id)) {
            return (
              <ListGroup.Item
                key={listUser._id}
                className="px-1 py-2 py-md-1 border-bottom pointer hover"
                onClick={() => submitAssign(listUser._id)}
              >
                <Stack
                  direction="horizontal"
                  className="justify-content-start align-items-center"
                >
                  <NameDisplay
                    uid={listUser._id}
                    h={windowWidth < MOBILE_BREAKPOINT ? "h5" : "h6"}
                  />
                  <p className="text-muted mb-0">
                    {listUser._id === creator
                      ? "(creator)"
                      : listUser._id === user.uid
                      ? "(me)"
                      : ""}
                  </p>
                </Stack>
              </ListGroup.Item>
            );
          }
          return null;
        })}
      </ListGroup>
    </>
  );
};

export default Assign;
