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
  const round = parseInt(queryParams.get('round') || "0", 10);
  const [distance, setDistance] = useState<number | null>(null);
  const [timerTime, setTimerTime] = useState(120);
  const navigate = useNavigate();

  const handleDistance = (calculatedDistance: number) => {
    setDistance(calculatedDistance);
    console.log("(GlobeGuesser) Distance from GameInput:", calculatedDistance);
    if (webSocketService.connected) {
      const lobbyId = localStorage.getItem("lobby");
      distanceSender(calculatedDistance, lobbyId);
      console.log("(GlobeGuesser) Distance sent via WebSocket: " + calculatedDistance)
    } else {
      console.error("No connection (GlobeGuesser)");
    }
  }

  async function distanceSender(distance, lobbyId) {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const requestBody = JSON.stringify({ "id": userId, "score": distance });
      console.log(`(GlobeGuesserLobby) score to /Lobby/GameMode1/${lobbyId} with ${requestBody}`);
      const headers = {
        'Authorization': `${token}`
      };
      await api.put(`/Lobby/GameMode1/${lobbyId}`, requestBody, { headers });
      navigate("/lobby");

    } catch (error) {
      console.error(`Failed to update score: ${handleError(error)}`);
    }
  }

//when the timer is expired send default large distance
const onTimeExpired = () => {
  console.log("Timer expired, sending default distance");
  handleDistance(100000000000000);
};

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header />
        <ScoreBoard timerTime={timerTime} onTimeExpired={onTimeExpired} currentRound={round} totalRounds={5} />
        <GameInput lat={lat} long={long} onDistanceCalculated={handleDistance} />
      </div>
    </BaseContainer>
  );
};

export default GlobeGuesser;
