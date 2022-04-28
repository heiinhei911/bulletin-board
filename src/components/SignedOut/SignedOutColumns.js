import { MOBILE_BREAKPOINT } from "../../defaults";
import { getWindowDimensions } from "../../helpers/window-dimensions";
import { signedInColumnDefault } from "../../defaults";
import Button from "react-bootstrap/Button";
import { nanoid } from "nanoid";
import "./SignedOutColumns.scss";

const SignedOutColumns = ({ chooseType, loginDemoUser }) => {
  const { windowWidth } = getWindowDimensions();

  return signedInColumnDefault.map((option, i) => (
    <div
      key={nanoid()}
      className={`sign-in-options-column-${i} border rounded shadow-sm pt-3 pb-5 px-2 my-1 my-md-0 mx-md-1 ${
        windowWidth < MOBILE_BREAKPOINT ? "w-100" : ""
      } w-50 bg-light position-relative`}
    >
      <div className="column-bg-text text-left text-muted">
        <h2 className="h5 px-3 text-bold">{option.title}</h2>
        <hr className="mx-3 my-2" />
        <ul>
          {option.content.map((task) => (
            <li key={nanoid()} className="h6 px-2">
              {task}
            </li>
          ))}
        </ul>
      </div>
      <div className="column-overlay text-center py-5 px-2 position-absolute">
        <h2 className="text-shadow h5">{option.text}</h2>
        <Button
          variant={option.color}
          onClick={() =>
            i === 2 ? loginDemoUser() : chooseType(option.label.toLowerCase())
          }
          className="w-75 shadow-sm"
        >
          {option.label}
        </Button>
      </div>
    </div>
  ));
};
export default SignedOutColumns;
