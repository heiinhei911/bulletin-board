import NameDisplay from "../../../NameDisplay";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const PostActionsToast = ({
  type,
  postActions,
  togglePostActions,
  details,
}) => {
  const msgClasses = "h5 text-black mb-0";
  const firstSpanMsgClass = "text-success";
  const secondSpanMsgClass = "text-warning font-italic";
  const selectType = () => {
    switch (type) {
      case "assign":
        return (
          <h3 className={msgClasses}>
            Assigned{" "}
            <span className={`${firstSpanMsgClass} d-inline-block`}>
              <NameDisplay uid={details.assignee} avator={false} h="h5" />
            </span>{" "}
            to <span className={secondSpanMsgClass}>{details.cardName}</span>
          </h3>
        );
      case "priority":
        return (
          <h3 className={msgClasses}>
            Set the priority in{" "}
            <span className={secondSpanMsgClass}>{details.cardName}</span> from{" "}
            <span className={firstSpanMsgClass}>{details.oldPriority}</span> to{" "}
            <span className={firstSpanMsgClass}>{details.newPriority}</span>
          </h3>
        );
      //   case "duedate":
      //     return "Set due date to";
      case "copy":
        return (
          <h3 className={msgClasses}>
            Copied <span className={firstSpanMsgClass}>{details.cardName}</span>{" "}
            to <span className={secondSpanMsgClass}>{details.to}</span>
          </h3>
        );
      case "move":
        return (
          <h3 className={msgClasses}>
            Moved <span className={firstSpanMsgClass}>{details.cardName}</span>{" "}
            from <span className={secondSpanMsgClass}>{details.from}</span> to{" "}
            <span className={secondSpanMsgClass}>{details.to}</span>
          </h3>
        );
      default:
        return;
    }
  };

  return (
    <ToastContainer position="bottom-center" style={{ zIndex: 2000 }}>
      <Toast
        show={postActions}
        autohide
        delay={3000}
        onClose={() => togglePostActions(false)}
      >
        <Toast.Body className="text-center">{selectType()}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
export default PostActionsToast;
