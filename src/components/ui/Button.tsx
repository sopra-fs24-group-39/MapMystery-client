import React from "react";
import "../../styles/ui/Button.scss";
import PropTypes from "prop-types";

//TODO: special buttons

const Button = (props) => {
  return (
      <div className={"button-container"}>
          <button
              className={"button "+props.type+"-button"}>
          </button>
          <div className={"button-shine"}></div>
          <div className={"button-font-container"}><span className={"button-font"}>{props.name}</span></div>
      </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
};

export default Button;