import React, { useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import GameInput from "components/ui/GameInput";
import ScoreBoard from "components/ui/ScoreBoard";
import BackgroundImage from "./sources/background.png";
import { useLocation, useNavigate } from "react-router-dom";

const GlobeGuesser: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get('lat');
  const long = queryParams.get('long');
  const [distance, setDistance] = useState<number | null>(null);
  const [timerTime, setTimerTime] = useState(120);
  const navigate = useNavigate();

  const handleDistance = (calculatedDistance: number) => {
    setDistance(calculatedDistance);
    console.log("(GlobeGuesser) Distance from GameInput:", calculatedDistance);
    navigate(`/lobby?distance=${calculatedDistance}`);
  }

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header />
        <ScoreBoard timerTime={timerTime} />
        <GameInput lat={lat} long={long} onDistanceCalculated={handleDistance} />
      </div>
    </BaseContainer>
  );
};

export default GlobeGuesser;
