const priorityCardBorderDisplay = (priority) => {
  switch (priority) {
    case 1:
      return "border-danger";
    case 2:
      return "border-warning";
    default:
      return "";
  }
};

const priorityTagTextDisplay = (priority) => {
  switch (priority) {
    case 1:
      return "HIGH PRIORITY";
    case 2:
      return "MEDIUM PRIORITY";
    default:
      return "LOW PRIORITY";
  }
};

const priorityTagColorDisplay = (priority) => {
  switch (priority) {
    case 1:
      return "bg-danger";
    case 2:
      return "bg-warning";
    default:
      return "bg-secondary";
  }
};

export {
  priorityTagTextDisplay,
  priorityTagColorDisplay,
  priorityCardBorderDisplay,
};
