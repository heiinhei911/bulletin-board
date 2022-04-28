import { BiErrorCircle } from "react-icons/bi";
import Stack from "react-bootstrap/Stack";

const Error = () => {
  return (
    <Stack className="align-items-center m-2">
      <BiErrorCircle size="50px" />
      <p className="h5 mt-1">This page does not exist!</p>
    </Stack>
  );
};

export default Error;
