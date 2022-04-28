import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignedIn } from "../../../contexts/SignedInContext";
import { getWindowDimensions } from "../../../helpers/window-dimensions";
import { MOBILE_BREAKPOINT } from "../../../defaults";
import DeleteToolTip from ".././DeleteToolTip";
import DeleteToast from "../Board/DeleteToast";
import { removeProject } from "../../../helpers/updateData";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import ProjectIcon from "../../../assets/images/scrum_board.svg";
import { MdDelete } from "react-icons/md";

const ProjectCard = ({ i }) => {
  const { projects, setProjects, setBoards } = useSignedIn();
  const { windowWidth } = getWindowDimensions();
  const [deleteIcon, setDeleteIcon] = useState(windowWidth < MOBILE_BREAKPOINT);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const deleteDialogTarget = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (windowWidth < MOBILE_BREAKPOINT) setDeleteIcon(true);
  }, [deleteIcon]);

  useEffect(() => {
    if (deleteConfirm) setDeleteDialog(false);
  }, [deleteConfirm]);

  const toggleDeleteConfirm = (bool) =>
    bool === true || bool === false
      ? setDeleteConfirm(bool)
      : setDeleteConfirm((prevDeleteConfirm) => !prevDeleteConfirm);

  const enterBoard = (id, i) => {
    navigate(`/projects/${id}`, { state: { projectIndex: i } });
  };

  const submitRemoveProject = () => {
    removeProject(setProjects, setBoards, projects[i]._id, i);
  };

  return (
    <>
      <Card
        className={`pointer my-1 my-md-0 mx-md-1 ${
          windowWidth < MOBILE_BREAKPOINT ? "w-100" : ""
        }`}
        onClick={() => enterBoard(projects[i]._id, i)}
        onMouseEnter={() => setDeleteIcon(true)}
        onMouseLeave={() => setDeleteIcon(false)}
      >
        <Card.Img variant="top" src={ProjectIcon} />
        <Card.Body>
          <Stack direction="horizontal" className="justify-content-between">
            <Card.Title className="mb-0 my-1">{projects[i].display}</Card.Title>
            {deleteIcon && (
              <div
                className="delete-project pointer"
                ref={deleteDialogTarget}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDeleteConfirm();
                }}
                onMouseEnter={() => setDeleteDialog(true)}
                onTouchStart={() => setDeleteDialog(true)}
                onMouseLeave={() => setDeleteDialog(false)}
              >
                <MdDelete
                  size={windowWidth < MOBILE_BREAKPOINT ? "1.8rem" : "1.5rem"}
                  color={deleteDialog ? "#F41016" : "#D11A2A"}
                />
              </div>
            )}

            {deleteDialog && (
              <DeleteToolTip
                deleteDialog={deleteDialog}
                deleteDialogTarget={deleteDialogTarget}
                display={projects[i].display}
              />
            )}
          </Stack>
        </Card.Body>
      </Card>
      <DeleteToast
        deleteConfirm={deleteConfirm}
        toggleDeleteConfirm={toggleDeleteConfirm}
        display={projects[i].display}
        submitFunction={submitRemoveProject}
      />
    </>
  );
};
export default ProjectCard;
