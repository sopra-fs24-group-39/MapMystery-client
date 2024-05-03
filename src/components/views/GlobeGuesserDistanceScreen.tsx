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

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header/>
      </div>
      <div className="main-body-distance">
        <Title text="Your Guess:" className="site-title" size={"md"}></Title>
        <GlobeGuesserDistance coords1={coords1} coords2={coords2}/>
      </div>
    </BaseContainer>
  );
};

export default GlobeGuesserDistanceScreen;
