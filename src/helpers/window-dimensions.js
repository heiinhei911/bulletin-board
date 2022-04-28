import { useState, useEffect } from "react";

const getWindowDimensions = () => {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  return {
    windowWidth,
    windowHeight,
  };
};

const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(
    getWindowDimensions().windowHeight
  );

  useEffect(() => {
    const resize = () => {
      setWindowHeight(getWindowDimensions().windowHeight);
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return windowHeight;
};

export { useWindowHeight, getWindowDimensions };
