import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const DeleteToast = ({
  deleteConfirm,
  toggleDeleteConfirm,
  display,
  submitFunction,
}) => {
  const [deleted, setDeleted] = useState(false);

  const submitDelete = () => {
    submitFunction();
    toggleDeleteConfirm(false);
    setDeleted(true);
  };

  return (
    <ToastContainer position="bottom-center" style={{ zIndex: 2000 }}>
      <Toast show={deleteConfirm} onClose={() => toggleDeleteConfirm(false)}>
        <Toast.Header closeLabel="close delete confirmation">
          <h3 className="h5 mr-auto mb-0 text-black">
            Delete <span className="text-warning">{display}</span>?
          </h3>
        </Toast.Header>
        <Toast.Body className="text-center">
          <Stack
            direction="horizontal"
            className="justify-content-center align-items-stretch"
          >
            <Button
              variant="danger"
              className="mx-1 w-50"
              onClick={submitDelete}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              className="mx-1 w-50"
              onClick={() => toggleDeleteConfirm(false)}
            >
              Don't Delete
            </Button>
          </Stack>
        </Toast.Body>
      </Toast>
      <Toast
        show={deleted}
        autohide
        delay={3000}
        onClose={() => setDeleted(false)}
      >
        <Toast.Body className="text-center">
          <h3 className="h5 text-black mb-0">Deleted</h3>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
export default DeleteToast;
