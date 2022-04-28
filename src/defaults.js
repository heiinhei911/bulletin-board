const NAME = "Bulletin Board";
const DESCRIPTION = "A Scrum-Kanban board";

const MOBILE_BREAKPOINT = 576;
const DESKTOP_BREAKPOINT = 992;

const namesDefault = { firstName: "", lastName: "" };
const contentDefault = {
  title: "",
  description: "",
  priority: 0,
  createdAt: 0,
};
const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const signedInColumnDefault = [
  {
    label: "Login",
    color: "primary",
    text: "Already have an account?",
    title: "To Do",
    content: [
      "Work on 'postComment' function",
      "Implement database uploading feature",
    ],
  },
  {
    label: "Register",
    color: "warning",
    text: "Don't have an account?",
    title: "In Progress",
    content: [
      "Set up 'Demo' user",
      "Set up fade in and fade out animations throughout the app",
    ],
  },
  {
    label: "Demo",
    color: "secondary",
    text: "Just want to try out the app?",
    title: "Done",
    content: [
      "Implement Drag & Drog for each column",
      "Implement Login and Register",
      "Set up database CRUD functionalities",
    ],
  },
];

export {
  namesDefault,
  contentDefault,
  animation,
  NAME,
  DESCRIPTION,
  MOBILE_BREAKPOINT,
  DESKTOP_BREAKPOINT,
  signedInColumnDefault,
};
