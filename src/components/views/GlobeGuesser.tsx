import React, { useState, useEffect } from "react";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import GameInput from "components/ui/GameInput";
import ScoreBoard from "components/ui/ScoreBoard";
import BackgroundImage from "./sources/background.png";
import { useLocation, useNavigate } from "react-router-dom";
import { webSocketService } from './WebSocketService';
import { api, handleError } from "helpers/api";
import { useBeforeUnload } from "helpers/useBeforeUnload";

const GlobeGuesser: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get('pong');
  const long = queryParams.get('ping');
  const [distance, setDistance] = useState<number | null>(null);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [timeDelta, setTimeDelta] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);
    setTimerId(id);

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, []);

  const handleDistance = async (calculatedDistance: number) => {
      setDistance(calculatedDistance);
      setTimeDelta(timer/2);
      console.log("(GlobeGuesser) Distance from GameInput:", calculatedDistance);
      console.log("(GlobeGuesser) Time from GameInput:", timeDelta);
      if (webSocketService.connected) {
        const lobbyId = localStorage.getItem("lobby");
        return distanceSender(calculatedDistance, timeDelta, lobbyId);
      } else {
        return Promise.reject(new Error("No connection (GlobeGuesser)"));
      }
  }

  //navigation in the game
  const handleNavigate = (coords) => {
    const { lat1, lng1, lat2, lng2 } = coords;
    const url = `/distance?lat1=${lat1}&lng1=${lng1}&lat2=${lat2}&lng2=${lng2}`;
    navigate(url);
  };

  const handleCustomNavigate = async (url) => {
    console.log("URL", url);
      try {
          await leaveLobby();
          navigate(url);
      } catch (error) {
          console.error("Error during navigation preparation: ", error);
          navigate("/start")
      }
  };


  async function distanceSender(distance: number, timeDelta: number, lobbyId: string) {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const requestBody = JSON.stringify({ "playerId": parseInt(userId, 10), "distance": distance, "timeDelta": timeDelta });
      console.log("GlobeGuesser sending distance", requestBody);
      const headers = {
        'Authorization': `${token}`
      };
      await api.put(`/Lobby/GameMode1/${lobbyId}`, requestBody, { headers });

    } catch (error) {
      console.error(`Failed to update score: ${handleError(error)}`);
    }
  }

  async function leaveLobby() {
    console.log("Leaving lobby");
    try {
      webSocketService.disconnect();
      //gettging the things needed to leave lobby
      const userId = localStorage.getItem("userId");
      const lobbyId = localStorage.getItem("lobby");
      const token = localStorage.getItem("token");
      localStorage.removeItem("round");
      localStorage.removeItem("lobby");
      localStorage.removeItem("leaderboard")
      localStorage.removeItem("gamemode")

      //making the call to leave the lobby
      const headers = {
        'Authorization': `${token}`
      };

      await api.delete(`/Lobby/GameMode1/${lobbyId}/${userId}`, { headers });
      navigate('/');
    } catch (error) {
      console.error(`Failed to leave lobby: ${handleError(error)}`);
    }
  }

  useBeforeUnload("Leaving this page will reset the game", () => {
    console.log("User is leaving the page or closing tab.");
    leaveLobby();
  });

//when the timer is expired send default large distance
  const onTimeExpired = () => {
    handleDistance(20037508);
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
        <Header onNavigateClick={handleCustomNavigate} />
        <ScoreBoard  onTimeExpired={onTimeExpired} currentRound={parseInt(localStorage.getItem("round"), 10) + 1} totalRounds={5} />
        <GameInput lat={lat} long={long} onDistanceCalculated={handleDistance} onNavigate={handleNavigate} />
      </div>
    </BaseContainer>
  );
};

export default GlobeGuesser;
