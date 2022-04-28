import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SignedInProvider } from "../contexts/SignedInContext";
import SignedIn from "./SignedIn/SignedIn";
import SignedOut from "./SignedOut/SignedOut/SignedOut";
import Error from "./Error";

const AnimatedRoutes = () => {
  const { user } = useAuth();

  const location = useLocation();
  return (
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={() => null}
    >
      <Routes location={location} key={location.pathname}>
        <Route
          path="/*"
          element={
            user ? (
              <SignedInProvider>
                <SignedIn />
              </SignedInProvider>
            ) : (
              <SignedOut />
            )
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
