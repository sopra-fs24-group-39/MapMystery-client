import { React, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/ui/DropDown.scss";
import "../../styles/ui/Button.scss";

/*
*   @props.defaultValue: A value that is displayed in the dropdown
*   @props.altValues: An array of values that is displayed in the dropdown (includes the default value!)
*/


const DropDown = (props) => {
  const [isExtended, setIsExtended] = useState(false);
  const [downSwitch, setDSwitch] = useState("");
  const [upSwitch, setUSwitch] = useState("hidden");
  const [selectedValue, setSelectedValue] = useState(props.defaultValue);

  function handleSelectedValue(element) {
    setSelectedValue(element);
    localStorage.setItem("gamemode", element);
  }

  const extendHandler = () => {
    setIsExtended(!isExtended);
    if (downSwitch === "hidden") {
      setDSwitch("");
      setUSwitch("hidden");
    } else {
      setDSwitch("hidden");
      setUSwitch("");
    }
  };

  function helperSelectedValue(element) {
    if (selectedValue === element) {
      return "hidden";
    }
    return "";
  }

  const arrayItems = props.altValues.map((x) =>
    <div key={x}
         className={"dd-link "+helperSelectedValue(x)}
         onClick={() => handleSelectedValue(x)}>
      <p className={"dd-font"}>{x}</p>
    </div>
  );

  return(
    <>
    <div className={"w-400 h-46 drop-down rounded-2xl flex flex-row justify-around items-center border-3 border-white"}
         onClick={extendHandler}>
      <p className={"dd-font"}>{selectedValue}</p>
      <div className={"arrow-down " + downSwitch}>
      </div>
      <div className={"arrow-up " + upSwitch}>
      </div>
    </div>
    <div className={"w-400 drop-down rounded-2xl flex flex-col justify-around items-center border-2 border-white " + upSwitch}
         onClick={extendHandler}>
      {arrayItems}
    </div>
    </>
  );
}

DropDown.propTypes = {
  defaultValue: PropTypes.string,
  altValues: PropTypes.array,
}

export default DropDown;

