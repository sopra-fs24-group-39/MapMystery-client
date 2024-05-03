import React, { useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import GameInput from "components/ui/GameInput";
import ScoreBoard from "components/ui/ScoreBoard";
import BackgroundImage from "./sources/background.png";
import { useLocation, useNavigate } from "react-router-dom";
import { webSocketService } from './WebSocketService';
import { api, handleError } from "helpers/api";

const GlobeGuesser: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get('pong');
  const long = queryParams.get('ping');
  const [distance, setDistance] = useState<number | null>(null);
  const [timerTime, setTimerTime] = useState(120);
  const navigate = useNavigate();

  const handleDistance = async (calculatedDistance: number) => {
      setDistance(calculatedDistance);
      console.log("(GlobeGuesser) Distance from GameInput:", calculatedDistance);
      if (webSocketService.connected) {
        const lobbyId = localStorage.getItem("lobby");
        return distanceSender(calculatedDistance, lobbyId); // This function already returns a Promise
      } else {
        console.error("No connection (GlobeGuesser)");
        return Promise.reject(new Error("No connection (GlobeGuesser)"));
      }
  }


  const handleNavigate = (coords) => {
    const { lat1, lng1, lat2, lng2 } = coords;
    console.log("navigateting to distnace")
    const url = `/distance?lat1=${lat1}&lng1=${lng1}&lat2=${lat2}&lng2=${lng2}`;
    navigate(url);
  };


  async function distanceSender(distance, lobbyId) {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const requestBody = JSON.stringify({ "id": userId, "score": distance });
      const headers = {
        'Authorization': `${token}`
      };
      await api.put(`/Lobby/GameMode1/${lobbyId}`, requestBody, { headers });
      console.log(`Updated score to ${distance}`);

    } catch (error) {
      console.error(`Failed to update score: ${handleError(error)}`);
    }
  }

//when the timer is expired send default large distance
const onTimeExpired = () => {
  console.log("Timer expired, sending default distance");
  handleDistance(100000000000000);
  handleNavigate({
    lat1: lat,
    lng1: long,
    lat2: -10000000000,
    lng2: -10000000000
  });
};

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header />
        <ScoreBoard timerTime={timerTime} onTimeExpired={onTimeExpired} currentRound={parseInt(localStorage.getItem("round"), 10) + 1} totalRounds={5} />
        <GameInput lat={lat} long={long} onDistanceCalculated={handleDistance} onNavigate={handleNavigate} />
      </div>
    </BaseContainer>
  );
};

export default GlobeGuesser;
