import { useEffect, useState } from "react";
import { userDbExists } from "../../../helpers/firebase-crud";
import { namesDefault } from "../../../defaults";
import "./Avator.scss";

const Avator = ({ uid }) => {
  const [name, setName] = useState(namesDefault);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userDbExists(uid).then((names) => {
      setName(names);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading && (
        <div className="avator border rounded-circle p-1 mx-1 d-flex flex-column justify-content-center align-items-center text-secondary text-center text-uppercase">
          {`${name.firstName[0]}${name.lastName[0]}`}
        </div>
      )}
    </>
  );
};

export default Avator;
