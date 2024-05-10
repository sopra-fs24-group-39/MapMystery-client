import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import Title from "components/ui/Title";
import GlobeGuesserDistance from "components/ui/GlobeGuesserDistance";
import BackgroundImage from "./sources/background.png";
import "../../styles/ui/GlobeGuesserDistanceScreen.scss";
import { webSocketService } from './WebSocketService';
import ScoreBoard from "components/ui/ScoreBoard";
import { useBeforeUnload } from "helpers/useBeforeUnload";


const GlobeGuesserDistanceScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const coords1 = {
    lat: parseFloat(searchParams.get('lat1')),
      lng: parseFloat(searchParams.get('lng1'))
  };

  const coords2 = {
    lat: parseFloat(searchParams.get('lat2')),
    lng: parseFloat(searchParams.get('lng2'))
  };

  useEffect(() => {
    const checkAndSubscribe = async () => {
      if (!webSocketService.connected) {
        console.log("(Dist)WebSocket is not connected. Attempting to connect...");
        await webSocketService.initializeWebSocket();
      }
      console.log("(Dist)Setting up subscription...");
      try {
        await webSocketService.subscribe2(localStorage.getItem("lobby"), handleLeaderBoardUpdateDist);
      } catch (error) {
        console.error("Failed to subscribe:", error);
      }
    };

    checkAndSubscribe();

    return () => {
    };
  }, []);

  function handleLeaderBoardUpdateDist(message) {
    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message);
      console.log("(Distance) LeaderBoard update with message:", parsedMessage);
      //setLeaderBoard(parsedMessage);
      localStorage.setItem("leaderboard", JSON.stringify(parsedMessage));
      navigate("/lobby");
    } catch (error) {
      console.error('Error parsing leaderboard update message:', error);
    }
  }

  if (isNaN(coords1.lat) || isNaN(coords1.lng) || isNaN(coords2.lat) || isNaN(coords2.lng)) {
    return <p>Invalid coordinates provided in URL.</p>;
  }

  async function leaveLobby() {
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

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header onNavigateClick={handleCustomNavigate} />
      </div>
      <div className="main-body-distance">
        <Title text="Your Guess:" className="site-title" size={"md"}></Title>
        <GlobeGuesserDistance coords1={coords1} coords2={coords2}/>
      </div>
    </BaseContainer>
  );
};

export default GlobeGuesserDistanceScreen;
