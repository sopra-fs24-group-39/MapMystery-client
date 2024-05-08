import React, { useState, useEffect } from "react";
import "../../styles/ui/GameInput.scss";
import Button from "components/ui/Button";
import FlagView from "../views/FlagView";
import MapViewCountry from "../views/MapsViewCountry";
import { calculateDistance } from "../../helpers/distance";
import { useNavigate } from "react-router-dom";

interface GameInputProps {

}

const GameInput: React.FC<GameInputProps> = ({ }) => {
  const navigate = useNavigate();
  const [yellowStyle] = useState({
    width: '75%',
    height: '80%',
    top: '2%',
    left: '1%',
    zIndex: 1,
    position: 'absolute',
    border: 'solid 15px #FDF319',
  });

  const [blueStyle, setBlueStyle] = useState({
    width: '32%',
    height: '37%',
    top: '62%',
    left: '64%',
    zIndex: 2,
    position: 'absolute',
    border: 'solid 15px #82CBE2',
    overflow: 'hidden',
  });

  const handleButtonClick = () => {
    console.log("Submit button clicked");
  }

  const handleFlagLoad = (width, height) => {
      const aspectRatio = width / height;
      const newHeight = parseInt(blueStyle.width, 10) / aspectRatio;
      setBlueStyle(prevStyle => ({
        ...prevStyle,
        height: `${newHeight}%`
      }));
    };

  return (
    <div>
      <div className="rectangle yellow-rectangle" style={yellowStyle}>
        <MapViewCountry onCountryUpdate={(country) => console.log(country)} />
      </div>
      <div className="rectangle blue-rectangle" style={blueStyle}>
        <FlagView countryCode="ch" onFlagLoad={handleFlagLoad}/>
      </div>
      <div className="submit-button">
        <Button type={"login"} width={"lg"} name={"Submit Guess"} onClick={handleButtonClick}></Button>
      </div>
    </div>
  );
};

export default GameInput;
