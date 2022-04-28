import { motion } from "framer-motion";
import { animation } from "../defaults";

const MotionDiv = ({ children, style, ...rest }) => {
  return (
    <motion.div {...rest} {...animation} style={style ? style : ""}>
      {children}
    </motion.div>
  );
};

export default MotionDiv;
