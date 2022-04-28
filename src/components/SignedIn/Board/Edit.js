import { useState, useRef } from "react";
import MotionDiv from "../../../helpers/animated-motion-div";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { MdEdit } from "react-icons/md";
import { AiFillPushpin } from "react-icons/ai";

const Edit = ({
  thing,
  display,
  pin,
  h,
  noPad,
  width,
  leftMargin,
  submitFunction,
}) => {
  const [editName, setEditName] = useState(false);
  const editNameInput = useRef("");
  const [editIcon, setEditIcon] = useState(false);
  let editIconTimer = null;

  const toggleEditIcon = () => setEditIcon((prevEditIcon) => !prevEditIcon);
  const toggleEditName = () => setEditName((prevEditName) => !prevEditName);
  const submitNewName = (e) => {
    e.preventDefault();
    submitFunction(editNameInput.current.value);
    editNameInput.current.blur();
    setEditName(false);
  };
  const thingDisplay = thing
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Stack direction="horizontal">
      {editName ? (
        <Form onSubmit={(e) => submitNewName(e)}>
          <Form.Control
            as="input"
            ref={editNameInput}
            className={`edit-name-input ${width ? width : "w-100"} ${
              noPad && "p-0"
            }`}
            placeholder={`New ${thingDisplay}...`}
            defaultValue={display}
            maxLength={80}
            autoFocus
            onBlur={() => toggleEditName(false)}
          />
        </Form>
      ) : (
        <h3
          className={`${thing}-display ${h && h} mb-0 ${leftMargin && "mx-1"}`}
          onMouseEnter={() => {
            clearTimeout(editIconTimer);
            toggleEditIcon(true);
          }}
          onMouseLeave={() => {
            editIconTimer = setTimeout(() => toggleEditIcon(false), 1000);
          }}
        >
          {display}
          {pin && <AiFillPushpin className="pin" color="#D11A2A" />}
        </h3>
      )}
      {editIcon && (
        <MotionDiv
          className={`${pin ? "mx-1" : "mx-2"} px-1 pointer my-1`}
          onMouseEnter={() => clearTimeout(editIconTimer)}
          onMouseLeave={() =>
            setTimeout(() => {
              toggleEditIcon(false);
            }, 500)
          }
          onClick={() => {
            toggleEditName(false);
            toggleEditIcon(false);
          }}
        >
          <MdEdit size="1rem" />
        </MotionDiv>
      )}
    </Stack>
  );
};

export default Edit;
