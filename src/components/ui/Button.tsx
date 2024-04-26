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
*
* Name options
* @name: type string
* */

const regButton = (width, name, onClick) => {
  return (
    <div className={"button-container"}>
      <button
        className={"button "+width+"-button"}
        onClick={onClick}>
      </button>
      <div className={"button-shine"}></div>
      <div className={"button-font-container"}><span className={"button-font"}>{name}</span></div>
    </div>
  );
}

const loginButton = (width, name, onClick) => {
  return (
    <div className={"login-button-container"}>
      <button
        className={"login-button "+width+"-button"}
        onClick={onClick}>
      </button>
      <div className={"login-button-shine"}></div>
      <div className={"button-font-container"}><span className={"login-button-font"}>{name}</span></div>
    </div>
  );
}

const Button = (props) => {
  const { type, width, name, onClick } = props;
  let res = null;
  if (type === "login") {
    res = loginButton(width,name, onClick);
  } else if (type === "regular") {
    res = regButton(width, name, onClick);
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
  onClick: PropTypes.func,
};

export default Button;