import { useSignedIn } from "../../contexts/SignedInContext";
import { Routes, Route } from "react-router-dom";
import MotionDiv from "../../helpers/animated-motion-div";
import Dashboard from "./DashBoard/Dashboard";
import Board from "./Board";
import Error from "../Error";
import Nav from "./Nav/Nav";

const SignedIn = () => {
  const { projects, boards } = useSignedIn();
  // console.log("projects: ", projects);
  // console.log("boards: ", boards);

  return (
    <MotionDiv className="signed-in w-100">
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Board />}>
          <Route path=":project_id" element={<Board />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
        <Route path="/bulletin-board/" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </MotionDiv>
  );
};

export default SignedIn;
