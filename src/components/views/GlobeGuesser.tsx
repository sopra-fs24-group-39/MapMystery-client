import React, { useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import GameInput from "components/ui/GameInput";
import ScoreBoard from "components/ui/ScoreBoard";
import BackgroundImage from "./sources/background.png";

const GlobeGuesser = () => {
  const [timerTime, setTimerTime] = useState(180);  // Default timer

  const handleSetTimerTime = (time) => {
    setTimerTime(time);
  }

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header />
        <ScoreBoard timerTime={timerTime} />
        <GameInput setTimerTime={handleSetTimerTime} />
      </div>
    </BaseContainer>
  );
};

export default GlobeGuesser;
