import { useEffect, useState } from "react";
import { userDbExists } from "../../helpers/firebase-crud";
import Avator from "./Avator/Avator";
import { namesDefault } from "../../defaults";
import Stack from "react-bootstrap/Stack";
import { MdPersonOff } from "react-icons/md";

const NameDisplay = ({ uid, classes, none, avator, h }) => {
  const [userName, setUserName] = useState(namesDefault);
  const name = (
    <h3 className={`user-name ${h ? h : "h6"} mx-1 my-0`}>
      {`${userName.firstName} ${userName.lastName}`}
    </h3>
  );

  useEffect(() => {
    if (uid) {
      userDbExists(uid).then((names) => {
        if (names) {
          setUserName(names);
        } else {
          console.error("User not found.");
        }
      });
    }
  }, []);

  return (
    <>
      {none ? (
        <Stack direction="horizontal" className="mx-1">
          <MdPersonOff size="1.5rem" className="mx-1" />
          <h3 className="user-name h6 mx-1 my-0">None</h3>
        </Stack>
      ) : avator === false ? (
        name
      ) : (
        <Stack direction="horizontal" className={classes && classes}>
          <Avator uid={uid} className="mx-1" />
          {name}
        </Stack>
      )}
    </>
  );
};

export default NameDisplay;
