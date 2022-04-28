import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

const DeleteToolTip = ({ deleteDialog, deleteDialogTarget, display }) => {
  return (
    <Overlay
      target={deleteDialogTarget.current}
      show={deleteDialog}
      placement="top"
    >
      {(props) => (
        <Tooltip id="delete-dialog" {...props}>
          <p className="mb-0">Delete "{display}"</p>
        </Tooltip>
      )}
    </Overlay>
  );
};

export default DeleteToolTip;
