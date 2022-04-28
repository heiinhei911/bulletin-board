import { useState, useEffect, useRef } from "react";
import { useSignedIn } from "../../../../contexts/SignedInContext";
import { useProject } from "../../../../contexts/ProjectContext";
import { getWindowDimensions } from "../../../../helpers/window-dimensions";
import { MOBILE_BREAKPOINT } from "../../../../defaults";
import { updateColumnName, removeColumn } from "../../../../helpers/updateData";
import Edit from "../Edit";
import DeleteToolTip from "../../DeleteToolTip";
import DeleteToast from "../DeleteToast";
import Stack from "react-bootstrap/Stack";
import { MdDelete } from "react-icons/md";

const ColumnHeader = ({ _id, display }) => {
  const { projects, setProjects, boards, setBoards } = useSignedIn();
  const projectIndex = useProject();
  const { windowWidth } = getWindowDimensions();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const deleteDialogTarget = useRef(null);

  useEffect(() => {
    if (deleteConfirm) setDeleteDialog(false);
  }, [deleteConfirm]);

  const toggleDeleteDialog = () =>
    setDeleteDialog((prevDeleteDialog) => !prevDeleteDialog);
  const toggleDeleteConfirm = (bool) =>
    bool === true || bool === false
      ? setDeleteConfirm(bool)
      : setDeleteConfirm((prevDeleteConfirm) => !prevDeleteConfirm);

  return (
    <>
      <Stack
        direction="horizontal"
        className="title my-1 px-1 pb-1 border-bottom justify-content-center"
      >
        <Edit
          thing="column-name"
          display={display}
          h={windowWidth < MOBILE_BREAKPOINT ? "h5" : "h6"}
          width="w-80"
          noPad={true}
          submitFunction={(value) =>
            updateColumnName(
              projects,
              boards,
              setBoards,
              _id,
              value,
              projectIndex
            )
          }
        />
        <h3
          className={`${
            windowWidth < MOBILE_BREAKPOINT ? "h5" : "h6"
          } px-1 px-md-0 count mb-0 ml-auto`}
        >
          {projects[projectIndex].boards[_id].length}
        </h3>
        <div className="vr mx-2 my-1 h6" />
        <div
          className="delete-column pointer"
          ref={deleteDialogTarget}
          onMouseEnter={toggleDeleteDialog}
          onMouseLeave={toggleDeleteDialog}
          onClick={toggleDeleteConfirm}
        >
          <MdDelete
            size={windowWidth < MOBILE_BREAKPOINT ? "2rem" : "1.2rem"}
            color={deleteDialog ? "#F41016" : "#D11A2A"}
            className="my-1"
          />
        </div>
        <DeleteToolTip
          deleteDialog={deleteDialog}
          deleteDialogTarget={deleteDialogTarget}
          display={display}
        />
      </Stack>
      <DeleteToast
        deleteConfirm={deleteConfirm}
        toggleDeleteConfirm={toggleDeleteConfirm}
        display={display}
        submitFunction={() =>
          removeColumn(
            projects,
            setProjects,
            boards,
            setBoards,
            _id,
            projectIndex
          )
        }
      />
    </>
  );
};

export default ColumnHeader;
