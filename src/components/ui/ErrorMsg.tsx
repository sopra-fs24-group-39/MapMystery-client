import { React } from "react";
import PropTypes from "prop-types";

const ErrorMsg = (props) => {
  return (
    <div className={"bg-orange-500 border-solid border-2 border-orange-900 h-14 will-change-auto flex flex-row justify-center rounded-md items-center"}>
      <p>{props.text}</p>
    </div>
  );
}

ErrorMsg.propTypes = {
  text: PropTypes.string,
}

export default ErrorMsg;