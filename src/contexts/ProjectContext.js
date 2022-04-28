import { createContext, useContext } from "react";

const ProjectContext = createContext();

const useProject = () => useContext(ProjectContext);

const ProjectProvider = ({ projectIndex, children }) => {
  return (
    <ProjectContext.Provider value={projectIndex}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider, useProject };
