import React, { useState } from "react";
import "../../styles/ui/GameInput.scss";
import Button from "components/ui/Button";
import PanoramaView from "../views/PanoramaView";

const GameInput = () => {
  const [yellowStyle, setYellowStyle] = useState({
    width: '70%',
    height: '75%',
    top: '6%',
    left: '1%',
    zIndex: 1,
    position: 'absolute',
    border: 'solid 15px #FFD700',
  });

  const [blueStyle, setBlueStyle] = useState({
    width: '35%',
    height: '35%',
    top: '64%',
    left: '64%',
    zIndex: 2,
    background: '#ffffff',
    position: 'absolute',
    border: 'solid 15px #ADD8E6',
  });

  const isYellowSmaller = () => {
    const yellowArea = parseFloat(yellowStyle.width) * parseFloat(yellowStyle.height);
    const blueArea = parseFloat(blueStyle.width) * parseFloat(blueStyle.height);
    return yellowArea < blueArea;
  };

  const handleSwap = () => {
    // Swap styles only if the condition is met (smaller rectangle was clicked)
    if (yellowStyle.zIndex < blueStyle.zIndex) {
      // Yellow is on top and smaller
      setYellowStyle(prev => ({ ...prev, ...blueStyle, zIndex: 2, border: 'solid 15px #FFD700' }));
      setBlueStyle(prev => ({ ...prev, ...yellowStyle, zIndex: 1, border: 'solid 15px #ADD8E6' }));
    } else {
      // Blue is on top and smaller
      setBlueStyle(prev => ({ ...prev, ...yellowStyle, zIndex: 2, border: 'solid 15px #ADD8E6' }));
      setYellowStyle(prev => ({ ...prev, ...blueStyle, zIndex: 1, border: 'solid 15px #FFD700' }));
    }
  };

  const handleButtonClick = () => {
    setTimerTime(15);
  };

  return (
    <div>
      <div
        className="rectangle yellow-rectangle"
        style={yellowStyle}
        onClick={isYellowSmaller() ? handleSwap : undefined}
      >
        <PanoramaView />
        {isYellowSmaller() && (
          <div className="click-overlay" onClick={handleSwap} />
        )}
      </div>
      <div
        className="rectangle blue-rectangle"
        style={blueStyle}
        onClick={!isYellowSmaller() ? handleSwap : undefined}
      >
        {blueStyle.zIndex < yellowStyle.zIndex && (
          <div className="click-overlay" onClick={handleSwap} />
        )}
      </div>
      <div className="submit-button">
        <Button type={"login"} width={"lg"} name={"Submit Guess"} onClick={handleButtonClick}></Button>
      </div>
    </div>
  );
};

export default GameInput;
