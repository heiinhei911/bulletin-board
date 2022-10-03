import { useState, useRef, cloneElement, useEffect } from "react";
import { useSignedIn } from "../../../../../contexts/SignedInContext";
import { useProject } from "../../../../../contexts/ProjectContext";
import MotionDiv from "../../../../../helpers/animated-motion-div";
import NameDisplay from "../../../NameDisplay";
import { removeCard } from "../../../../../helpers/updateData";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsFillPersonPlusFill, BsExclamationCircleFill } from "react-icons/bs";
import {
  MdOutlineDateRange,
  MdOutlineContentCopy,
  MdDriveFileMoveOutline,
  MdDelete,
} from "react-icons/md";
import "./Sidebar.scss";

const Sidebar = ({ creator, assignedTo, columnId, _id, children }) => {
  const { projects, setProjects } = useSignedIn();
  const projectIndex = useProject();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const deleteDialogTarget = useRef(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if (deleteConfirm) setDeleteDialog(false);
  }, [deleteConfirm]);

  const toggleDeleteDialog = () =>
    setDeleteDialog((prevDeleteDialog) => !prevDeleteDialog);
  const toggleDeleteConfirm = (bool) =>
    bool === true || bool === false
      ? setDeleteConfirm(bool)
      : setDeleteConfirm((prevDeleteConfirm) => !prevDeleteConfirm);

  const assigned = assignedTo.map((assignee) =>
    cloneElement(children[0], {
      key: assignee,
      assignee,
    })
  );

  return (
    <>
      <MotionDiv>
        <div className="people">
          <div className="creator">
            <h2 className="h6 text-muted text-uppercase my-2">creator</h2>
            <NameDisplay uid={creator} />
          </div>
          <div className="assigned-to">
            <h2 className="h6 text-muted text-uppercase my-1 mt-3">
              assigned to
            </h2>
            {assignedTo.length > 0 ? (
              <Stack className="assigned-to-list">{assigned}</Stack>
            ) : (
              <NameDisplay none={true} />
            )}
          </div>
        </div>
        <Row>
          <Col xs={6} sm={6} md={12}>
            <div className="add-to-card my-2">
              <h2 className="h6 text-muted text-uppercase my-1">add to card</h2>
              <Stack className="add-to-card-btns">
                {cloneElement(children[1], {
                  type: "assign",
                  icon: (
                    <BsFillPersonPlusFill size="1.2rem" className="mr-half" />
                  ),
                  deleteConfirm,
                  text: "Assign",
                })}
                {cloneElement(children[1], {
                  type: "priority",
                  icon: (
                    <BsExclamationCircleFill
                      size="1.2rem"
                      className="mr-half"
                    />
                  ),
                  deleteConfirm,
                  text: "Priority",
                })}
                {/* {cloneElement(children[1], {
                  type: "duedate",
                  icon: (
                    <MdOutlineDateRange size="1.2rem" className="mr-half" />
                  ),
                  text: "Due Date",
                })} */}
              </Stack>
            </div>
          </Col>
          <Col xs={6} sm={6} md={12}>
            <div className="actions my-2">
              <h2 className="h6 text-muted text-uppercase my-1">actions</h2>
              <Stack className="actions-btns">
                {cloneElement(children[1], {
                  type: "copy",
                  icon: (
                    <MdOutlineContentCopy size="1.2rem" className="mr-half" />
                  ),
                  deleteConfirm,
                  text: "Copy",
                })}
                {cloneElement(children[1], {
                  type: "move",
                  icon: (
                    <MdDriveFileMoveOutline size="1.2rem" className="mr-half" />
                  ),
                  deleteConfirm,
                  text: "Move",
                })}
                <Button
                  variant="danger"
                  className="mx-1 my-1 py-1 text-left"
                  ref={deleteDialogTarget}
                  disabled={deleteConfirm}
                  onMouseEnter={toggleDeleteDialog}
                  onMouseLeave={toggleDeleteDialog}
                  onClick={toggleDeleteConfirm}
                >
                  <MdDelete size="1.2rem" className="mr-half" />
                  Delete
                </Button>
                {/* DeleteToolTip */}
                {deleteDialog &&
                  cloneElement(children[2], {
                    deleteDialog,
                    deleteDialogTarget,
                  })}
              </Stack>
            </div>
          </Col>
        </Row>
      </MotionDiv>
      {/* DeleteToast */}
      {cloneElement(children[3], {
        deleteConfirm,
        toggleDeleteConfirm,
        submitFunction: () =>
          removeCard(projects, setProjects, columnId, _id, projectIndex),
      })}
    </>
  );
};

export default Sidebar;
