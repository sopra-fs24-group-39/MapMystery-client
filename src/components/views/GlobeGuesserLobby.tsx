import React, { useEffect, useState } from "react";
import BaseContainer from "../ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Header from "./Header";
import Title from "../ui/Title";
import BaseElementLobby from "../ui/LobbyContainer";
import Button from "../ui/Button";
import { webSocketService } from './WebSocketService';
import { useNavigate, useLocation } from "react-router-dom";
import { api, handleError } from "helpers/api";
import { useBeforeUnload } from "helpers/useBeforeUnload";

type GlobeGuesserLobbyProps = {
  lobbyId: string;
};

const GlobeGuesserLobby: React.FC<GlobeGuesserLobbyProps> = ({ lobbyId }) => {
  //const [receivedCoordinates, setReceivedCoordinates] = useState(false);
  const [currentRound, setCurrentRound] = useState(() => {
    const storedRound = localStorage.getItem('round');
    return storedRound ? parseInt(storedRound, 10) : 0;
  });
  //const [leaderBoard, setLeaderBoard] = useState({});
  const navigate = useNavigate();
  var lobbyId = localStorage.getItem("lobby")
  console.log(`${lobbyId} and ${localStorage.getItem("lobby")} in Lobby`)

  useEffect(() => {
    localStorage.setItem('round', currentRound);
    localStorage.setItem('round', currentRound);
    setupSubscription1();
    setupSubscription2();
  }, []);

  function initializeLeaderboard() {
    const defaultLeaderboard = JSON.stringify({
      "Player 1": 0,
      "Player 2": 0,
      "Player 3": 0
    });
    if (localStorage.getItem("leaderboard") === null) {
      localStorage.setItem("leaderboard", defaultLeaderboard);
    }
  }

  // not needed anymore but if removed  get a no underlying STOMP connection error
  const queryParams = new URLSearchParams(location.search);
  const distance = queryParams.get('distance');

  //setting up connection if there is none
  if (!webSocketService.connected) {
    console.log("(GlobeGuesserLobby) connecting");
    webSocketService.initializeWebSocket();
    //localStorage.setItem("sub", "false");
  }

  //subscribing to chanel for coords
  async function setupSubscription1() {
    console.log("(GlobeGuesserLobby) Subscribing ");
    let subscription = await webSocketService.subscribe1(lobbyId, handleLobbyUpdate);
    //localStorage.setItem("sub", true);
  }

  //setupSubscription1();

  const storedRound = localStorage.getItem('round');

  if (storedRound === null) {
    localStorage.setItem('round', 0);
  } else {
    const newRound = parseInt(storedRound, 10) + 1;
    localStorage.setItem('round', newRound);
  }

  //for handeling the messages. The server sends hash map but somehow not working only this did
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
      console.log('(GlobeGuesserLobby) Lobby update with latitude:', latitude, 'and longitude:', longitude);
      navigate(`/globeguesser?ping=${longitude}&pong=${latitude}&round=${(currentRound + 1)%5}`);
    } else {
      console.error('Invalid latitude or longitude values:', latitude, longitude);
    }
  }

  //subscribing to chanel for coords
  async function setupSubscription2() {
    console.log("(GlobeGuesserLobby) Subscribing2 ");
    let subscription = await webSocketService.subscribe2(lobbyId, handleLeaderBoardUpdate);
    localStorage.setItem("sub2", true);
  }

  //setupSubscription2();

  function handleLeaderBoardUpdate(message) {
    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message);
      console.log("(GlobeGuesserLobby) LeaderBoard update with message:", parsedMessage);
      //setLeaderBoard(parsedMessage);
      localStorage.setItem("leaderboard", JSON.stringify(parsedMessage));
    } catch (error) {
      console.error('Error parsing leaderboard update message:', error);
    }
  }

  async function leaveLobby() {
    try {
      webSocketService.disconnect();
      //gettging the things needed to leave lobby
      const userId = localStorage.getItem("userId");
      const lobbyId = localStorage.getItem("lobby");
      const token = localStorage.getItem("token");
      localStorage.removeItem("round", 0);
      localStorage.removeItem("defaultLeaderboard")
      localStorage.removeItem("gamemode")

      //making the call to leave the lobby
      const headers = {
        'Authorization': `${token}`
      };

      await api.delete(`/Lobby/GameMode1/${lobbyId}/${userId}`, { headers });
      localStorage.setItem("leave", "true");
      navigate('/');
    } catch (error) {
      console.error(`Failed to leave lobby: ${handleError(error)}`);
    }
  }

  async function skipFirst() {
    try {
          const userId = localStorage.getItem("userId");
          const token = localStorage.getItem("token");
          const requestBody = JSON.stringify({ "id": userId, "score": 100000000000 });
          console.log(`(GlobeGuesserLobby) score to /Lobby/GameMode1/${lobbyId} with ${requestBody}`);
          const headers = {
            'Authorization': `${token}`
          };
          await api.put(`/Lobby/GameMode1/${lobbyId}`, requestBody, { headers });

        } catch (error) {
          console.error(`Failed to update score: ${handleError(error)}`);
        }
  }

  useBeforeUnload("Leaving this page will reset the game", () => {
    console.log("User is leaving the page or closing tab.");
    leaveLobby();

  });

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header />
        <Title text={"Globe Guesser"} size={"md"} />
        <BaseElementLobby elements={JSON.parse(localStorage.getItem("leaderboard"))} />
        <div>
          <div onClick={leaveLobby}>
            <Button width={"md"} type={"regular"} name={"Leave Game"} />
          </div>
          <div onClick={skipFirst}>
            <Button width={"md"} type={"regular"} name={"skip"} />
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default GlobeGuesserLobby;