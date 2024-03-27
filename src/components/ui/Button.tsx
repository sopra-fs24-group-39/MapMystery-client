import React from "react";
import "../../styles/ui/Button.scss";
import PropTypes from "prop-types";

// Standard buttons
// Large sized Button
const lg = (name:string) => {
  return (
    <div className={"button-container"}>
      <button
        className={"button lg-button"}>
      </button>
      <div className={"button-shine"}></div>
      <div className={"lg-button-font"}>{name}</div>
    </div>
  );
};

// Medium sized button
const md = (name:string) => {
  return (
    <div className={"button-container"}>
      <button
        className={"button md-button"}>
      </button>
      <div className={"button-shine"}></div>
      <div className={"md-button-font"}>{name}</div>
    </div>
  );
};

// Small sized button
const sm = (name:string) => {
  return (
    <div className={"button-container"}>
      <button
        className={"button sm-button"}>
      </button>
      <div className={"button-shine"}></div>
      <div className={"sm-button-font"}>{name}</div>
    </div>
  );
};

// TODO: Special buttons
function switchProps(t:string, name:string){
  let out: string = "This";
  switch (t) {
    case "lg":
      out = lg(name);
      break;
    case "md":
      out = md(name);
      break;
    case "sm":
      out = sm(name);
      break;
    case "":
      break;
  }
  return out;
}

const Button = (props) => {
 let out = switchProps(props.type, props.name);
  // console.log(props.children[1]);
  return (
    <div className={"button-main"}>
      {out}
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
};

export default Button;