import React, { useEffect, useState } from "react";
import BaseContainer from "../ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Header from "./Header";
import Title from "../ui/Title";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { webSocketService } from './WebSocketService';
import { useNavigate, useLocation } from "react-router-dom";
import { api, handleError } from "helpers/api";

type GlobeGuesserLobbyProps = {
  lobbyId: string;
};

const GlobeGuesserLobby: React.FC<GlobeGuesserLobbyProps> = ({ lobbyId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLeaving, setIsLeaving] = useState(false);
  var lobbyId = localStorage.getItem("lobby")
  console.log(`${lobbyId} and ${localStorage.getItem("lobby")} in Lobby`)

  //ghetting distance from URL
  const queryParams = new URLSearchParams(location.search);
  const distance = queryParams.get('distance');

  useEffect(() => {

    if (!webSocketService.connected) {
      webSocketService.initializeWebSocket();
    }

    let subscription;
    async function setupSubscription() {
      subscription = await webSocketService.subscribe(lobbyId, handleLobbyUpdate);
    }

    setupSubscription();

    //sending distance to backend for pointa
    if (distance && localStorage.getItem("visited")) {
      console.log(`Sending distance: ${distance} to lobby ID: ${lobbyId}`);
      webSocketService.sendDistance(distance, lobbyId);
    }

    return () => {
      if (isLeaving) {
        if (subscription) {
          subscription.unsubscribe();
          console.log("Unsubscribed from the lobby.");
        }
        webSocketService.disconnect();
      }
    };
  }, [lobbyId, isLeaving]);

  function handleLobbyUpdate(message) {
    let parsedMessage;
          try {
              parsedMessage = JSON.parse(message);
          } catch (error) {
              console.error('Error parsing lobby update message:', error);
              return;
          }

          let keys = Object.keys(parsedMessage);
          let latitude, longitude;

          for (let key of keys) {
              if (parsedMessage[key].toLowerCase() === 'latitude' || parsedMessage[key].toLowerCase() === 'lattitude') {
                  latitude = parseFloat(key);
              } else if (parsedMessage[key].toLowerCase() === 'longitude') {
                  longitude = parseFloat(key);
              }
          }

          if (!isNaN(latitude) && !isNaN(longitude)) {
              console.log('Lobby update with latitude:', latitude, 'and longitude:', longitude);
              navigate(`/globeguesser?lat=${latitude}&long=${longitude}`);
          } else {
              console.error('Invalid latitude or longitude values:', latitude, longitude);
          }
  }

  function leaveLobby() {
    setIsLeaving(true)
    webSocketService.disconnect();
    navigate('/');
  }

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header />
        <Title text={"Globe Guesser"} size={"md"} />
        <Container />
        <div onClick={leaveLobby}>
          <Button width={"md"} type={"regular"} name={"Leave Game"} />
        </div>
      </div>
    </BaseContainer>
  );
};

export default GlobeGuesserLobby;