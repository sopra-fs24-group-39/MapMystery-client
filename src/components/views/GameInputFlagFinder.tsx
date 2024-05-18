import React, { useState } from "react";
import "../../styles/ui/GameInput.scss";
import Button from "components/ui/Button";
import FlagView from "../views/FlagView";
import MapViewCountry from "../views/MapsViewCountry";

const GameInputFlagFinder: React.FC<{
  onCountryUpdate: (country: string, code: string) => void,
  onSubmit: () => void,
  code: string,
  currentName: string
}> = ({ onCountryUpdate, onSubmit, code, currentName }) => {
  const [yellowStyle] = useState({
    width: '70%',
    height: '80%',
    top: '6%',
    left: '1%',
    zIndex: 1,
    position: 'absolute',
    border: 'solid 15px #FDF319',
  });
  const [blueStyle, setBlueStyle] = useState({
    width: '32%',
    height: '37%',
    bottom: '20%',
    left: '64%',
    zIndex: 2,
    position: 'absolute',
  });

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
        <MapViewCountry onCountryUpdate={onCountryUpdate} />
      </div>
      <div className="rectangle blue-rectangle" style={blueStyle}>
        <FlagView countryCode={code} onFlagLoad={handleFlagLoad} />
      </div>
      <div className="submit-button">
        <Button type={"login"} width={"lg"} name={"Submit Guess"} onClick={onSubmit}></Button>
      </div>
    </div>
  );
};

export default GameInputFlagFinder;
