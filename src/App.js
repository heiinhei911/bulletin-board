import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { useWindowHeight } from "./helpers/window-dimensions";
import AnimatedRoutes from "./components/AnimatedRoutes";
import MotionDiv from "./helpers/animated-motion-div";
import "./App.scss";

const App = () => {
  const screenHeight = useWindowHeight();
  return (
    <MotionDiv
      className="App min-vh-100 min-vw-100 d-flex flex-column justify-content-start align-items-center"
      style={{ minHeight: screenHeight }}
    >
      <AuthProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AuthProvider>
    </MotionDiv>
  );
};

export default App;
