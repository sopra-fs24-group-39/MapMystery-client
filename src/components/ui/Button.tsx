import React from "react";
import "../../styles/ui/Button.scss";
import PropTypes from "prop-types";

/*
* Width options
* @auto: width = auto
* @lg: width = 400px
* @md: width = 185px
* @sm: width = 100px
*
* Type options
* @login: color = yellow
* @regular: color = blue
* */

const regButton = (width, name) => {
  return (
    <div className={"button-container"}>
      <button
        className={"button "+width+"-button"}>
      </button>
      <div className={"button-shine"}></div>
      <div className={"button-font-container"}><span className={"button-font"}>{name}</span></div>
    </div>
  );
}

const loginButton = (width, name) => {
  return (
    <div className={"login-button-container"}>
      <button
        className={"login-button "+width+"-button"}>
      </button>
      <div className={"login-button-shine"}></div>
      <div className={"button-font-container"}><span className={"login-button-font"}>{name}</span></div>
    </div>
  );
}

const Button = (props) => {
  let res = null;
  if (props.type === "login") {
    res = loginButton(props.width, props.name);
  } else if (props.type === "regular") {
    res = regButton(props.width, props.name);
  }
  return (
      <>
        {res}
      </>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  width: PropTypes.string,
  name: PropTypes.string,
};

export default Button;