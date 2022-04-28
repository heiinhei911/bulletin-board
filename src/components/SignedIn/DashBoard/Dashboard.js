import { useSignedIn } from "../../../contexts/SignedInContext";
import MotionDiv from "../../../helpers/animated-motion-div";
import { getWindowDimensions } from "../../../helpers/window-dimensions";
import { MOBILE_BREAKPOINT } from "../../../defaults";
import ProjectCard from "./ProjectCard";
import NewProject from "./NewProject";
import Stack from "react-bootstrap/Stack";
import { AiFillPushpin } from "react-icons/ai";
import "./Dashboard.scss";

const Dashboard = () => {
  const { projects } = useSignedIn();
  const { windowWidth } = getWindowDimensions();

  return (
    <MotionDiv className="dashboard p-2">
      <Stack direction="horizontal" className="justify-content-between">
        <h2 className="mx-1 my-2">
          Projects
          <AiFillPushpin className="pin" color="#D11A2A" />
        </h2>
        <NewProject />
      </Stack>
      <Stack
        direction={windowWidth > MOBILE_BREAKPOINT ? "horizontal" : "vertical"}
        className="flex-wrap justify-content-start align-items-center justify-content-md-start align-items-md-start"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project._id} i={i} />
        ))}
      </Stack>
    </MotionDiv>
  );
};

export default Dashboard;
