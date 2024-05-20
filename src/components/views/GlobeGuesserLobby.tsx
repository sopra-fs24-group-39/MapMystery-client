import React, { useEffect, useState, useRef } from "react";
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
import "../../styles/ui/GlobeGuesserLobby.scss";
import NotificationSquare from "components/ui/NotificationSquare";
import ClipboardIcon from "./sources/copy.svg";

type GlobeGuesserLobbyProps = {
  lobbyId: string;
};

const GlobeGuesserLobby: React.FC<GlobeGuesserLobbyProps> = ({ lobbyId }) => {
  //const [receivedCoordinates, setReceivedCoordinates] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationTimeout, setNotificationTimeout] = useState(null);
  const navigationOccurred = useRef(false);

  //needed for the lobby screen to sy game starting soon
  const searchParams = new URLSearchParams(location.search);
  const gm = searchParams.get("gm");
  const sp = gm === "sp";

  //fixing the rounds
  const currentRound = parseInt(searchParams.get('currentRound'));
  let currentFirstRound = 1;
  {/*
  if (!isNaN(currentRound) && currentRound > localStorage.getItem("round")) {
    localStorage.setItem("round", currentRound);
  } else {
    let tempRound = parseInt(localStorage.getItem("round"));
    localStorage.setItem("round", tempRound+1);
  }
  */}

  //const [leaderBoard, setLeaderBoard] = useState({});
  const navigate = useNavigate();
  var lobbyId = localStorage.getItem("lobby")

  useEffect(() => {
    console.log('Initial currentRound:', currentRound);
    handleRounds();
    setupSubscription1();
    setupSubscription2();
    if (parseInt(localStorage.getItem("roundies")) === 6) {
      console.log("Round is 5, starting timer...");
      const timer = setTimeout(handleTimerComplete, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleTimerComplete = () => {
    leaveLobby();
  }

  const handleRounds = () => {
    if (localStorage.getItem("counter") !== null && localStorage.getItem("counter") === "starting round counter") {
      const currentFirstRound = 1
      localStorage.removeItem("counter");
    } else {
      const currentFirstRound = null;
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

  //for handeling the messages. The server sends hash map but somehow not working only this did
  function handleLobbyUpdate(message) {
     console.log('currentRound before navigation:', currentRound);
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

    if (!isNaN(latitude) && !isNaN(longitude)  && !navigationOccurred.current) {
      navigationOccurred.current = true;
      if (searchParams.get('currentRound') !== null) {
        console.log("currentRound navigation");
        navigate(`/globeguesser?ping=${longitude}&pong=${latitude}&currentRound=${localStorage.getItem("roundies")}`);
      } else if(isNaN(currentRound)) {
        console.log("FirstRound navigation");
        navigate(`/globeguesser?ping=${longitude}&pong=${latitude}&currentRound=${currentFirstRound}`);
      } else {
        console.log("both nan navigation");
      }
    } else {
      addNotification("Error during sending the coordinates", "error");
    }
  }

  async function setupSubscription2() {
    let subscription = await webSocketService.subscribe2(lobbyId, handleLeaderBoardUpdate);
  }

  function handleLeaderBoardUpdate(message) {
    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message);
      localStorage.setItem("leaderboard", JSON.stringify(parsedMessage));
    } catch (error) {
      console.error('Error parsing leaderboard update message:', error);
      addNotification("Player joined lobby", "win");
    }
  }

  async function leaveLobby() {
    try {
      webSocketService.disconnect();
      //gettging the things needed to leave lobby
      const userId = localStorage.getItem("userId");
      const lobbyId = localStorage.getItem("lobby");
      const token = localStorage.getItem("token");
      const singlePlayer = localStorage.getItem("Singleplayer");

      //making the call to leave the lobby
      const headers = {
        'Authorization': `${token}`
      };

      {/* This is if we would implement a leave lobby for gamemode 3
      if (singlePlayer === "true") {
        const response = await api.delete(`/Lobby/GameMode3/${lobbyId}`, { headers });
        navigate('/');
      } else {
        const response = await api.delete(`/Lobby/GameMode1/${lobbyId}/${userId}`, { headers });
        navigate('/');
      }
      */}

      const response = await api.delete(`/Lobby/GameMode1/${lobbyId}/${userId}`, { headers });
    } catch (error) {
      console.error(`Failed to leave lobby: ${handleError(error)}`);
    } finally {
      localStorage.removeItem("round");
      localStorage.removeItem("lobby");
      localStorage.removeItem("leaderboard")
      localStorage.removeItem("gamemode")
      localStorage.removeItem("authKey");
      localStorage.removeItem("Singleplayer");
      localStorage.removeItem("roundies");
      navigate('/');
    }
  }

  useBeforeUnload("Leaving this page will reset the game", () => {
    leaveLobby();

  });

  const handleCustomNavigate = async (url) => {
    try {
      await leaveLobby();
      navigate(url);
    } catch (error) {
      console.error("Error during navigation preparation: ", error);
      addNotification("Error during leaving lobby", "error");
      navigate("/game")
    }
  };

  const handleClipboardCopy = () => {
    const lobbyCode = `${localStorage.getItem("authKey")}$${localStorage.getItem("lobby")}$`;
    navigator.clipboard.writeText(lobbyCode).then(() => {
      addNotification("Lobby code copied to clipboard", "default");
    }).catch(err => {
      console.error("Could not copy text: ", err);
    });
  };

  const addNotification = (text, type) => {
    if (!notificationTimeout) {
      const id = Date.now();
      setNotifications([{ id, text, type }]);
      setNotificationTimeout(setTimeout(() => {
        setNotifications([]);
        setNotificationTimeout(null);
      }, 5000));
    }
  };

  const removeNotification = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
    if (notifications.length === 1) {
      clearTimeout(notificationTimeout);
      setNotificationTimeout(null);
    }
  }

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <NotificationSquare
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <div className={"center-container"}>
        <Header onNavigateClick={handleCustomNavigate} />
          {(parseInt(localStorage.getItem("roundies")) === 6) ? (
            <>
              <Title text={"Final Scores"} size={"md"} />
              <div className="final-scores-leave">To play another round, leave the game.</div>
            </>
          ) : (
            <>
              <Title text={"Globe Guesser"} size={"md"} />
            </>
          )}
        {localStorage.getItem("authKey") !== null ? (
          <div className="text-container">
            <span className="lobby-code">Lobby Code: {localStorage.getItem("authKey")}${localStorage.getItem("lobby")}$</span>
            <button onClick={handleClipboardCopy} className="clipboard-button">
              <img src={ClipboardIcon} alt="Copy to Clipboard" />
            </button>
          </div>
        ) : null}
        <BaseElementLobby elements={JSON.parse(localStorage.getItem("leaderboard"))} sp={sp}/>
        <div>
          <div onClick={leaveLobby}>
            <Button width={"md"} type={"regular"} name={"Leave Game"} />
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default GlobeGuesserLobby;