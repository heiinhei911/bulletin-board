import { useState, cloneElement } from "react";
import PostActionsToast from "./PostActionsToast";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

const CardPopover = ({ type, icon, text, deleteConfirm, children }) => {
  const [show, setShow] = useState(false);
  const [postActions, setPostActions] = useState(false);
  const [details, setDetails] = useState({});

  const togglePostActions = (bool) =>
    bool === true || bool === false
      ? setPostActions(bool)
      : setPostActions((prevPostActions) => !prevPostActions);
  const toggleShow = (bool) =>
    bool === true || bool === false
      ? setShow(bool)
      : setShow((prevShow) => !prevShow);

  const populateDetails = (details) => setDetails(details);

  const selectType = () => {
    const newPropsObj = {
      togglePostActions,
      populateDetails,
    };
    const cloneElementWithProps = (elementChildren, propsObj) =>
      cloneElement(elementChildren, propsObj);

    switch (type) {
      case "assign":
        return cloneElementWithProps(children[0], newPropsObj);
      case "priority":
        return cloneElementWithProps(children[1], newPropsObj);
      case "duedate":
        return cloneElementWithProps(children[2], newPropsObj);
      case "copy":
        return cloneElementWithProps(children[3], {
          ...newPropsObj,
          type: "copy",
        });
      case "move":
        return cloneElementWithProps(children[3], {
          ...newPropsObj,
          type: "move",
        });
      default:
        return;
    }
  };

  const CardPopover = (
    <Popover id="card-popover">
      <Popover.Body className="px-1 py-2 text-center bg-light rounded">
        {selectType()}
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger
        show={show}
        placement="auto"
        overlay={CardPopover}
        rootClose
      >
        <Button
          variant="secondary"
          className="mx-1 my-1 py-1 text-left"
          onClick={toggleShow}
          onBlur={() =>
            setTimeout(() => {
              toggleShow(false);
            }, 100)
          }
          disabled={deleteConfirm}
        >
          {icon}
          {text}
        </Button>
      </OverlayTrigger>
      <PostActionsToast
        type={type}
        postActions={postActions}
        togglePostActions={togglePostActions}
        details={details}
      />
    </>
  );
};

export default CardPopover;
