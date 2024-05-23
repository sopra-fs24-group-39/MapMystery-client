import React from "react";
import "../../styles/ui/Input.scss";
import PropTypes from "prop-types";

const Input = (props) => {
  return (
    // style={{marginRight: spacing + 'em'}}
    <div className="input-bar" style={{height: props.height, width: props.width}}>
      <input type={props.type}
             placeholder=""
             value={props.value}
             onChange={(e) => props.onChange(e.target.value)}
             maxLength={75}
      />
    </div>
  );
};

Input.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
