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
  const [currentRound, setCurrentRound] = useState(() => {
    const storedRound = localStorage.getItem('round');
    return storedRound ? parseInt(storedRound, 10) : 0;
  });
  //const [leaderBoard, setLeaderBoard] = useState({});
  const navigate = useNavigate();
  var lobbyId = localStorage.getItem("lobby")

  useEffect(() => {
    localStorage.setItem('round', currentRound);
    localStorage.setItem('round', currentRound);
    setupSubscription1();
    setupSubscription2();
    if (parseInt(localStorage.getItem("round")) === 5) {
      console.log("Round is 5, starting timer...");
      const timer = setTimeout(handleTimerComplete, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleTimerComplete = () => {
    leaveLobby();
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
      navigate(`/globeguesser?ping=${longitude}&pong=${latitude}`);
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
    addNotification("Leaving lobby", "default");
    try {
      webSocketService.disconnect();
      //gettging the things needed to leave lobby
      const userId = localStorage.getItem("userId");
      const lobbyId = localStorage.getItem("lobby");
      const token = localStorage.getItem("token");

      //making the call to leave the lobby
      const headers = {
        'Authorization': `${token}`
      };

      const response = await api.delete(`/Lobby/GameMode1/${lobbyId}/${userId}`, { headers });
      console.log(response.status);
      navigate('/');
    } catch (error) {
      console.error(`Failed to leave lobby: ${handleError(error)}`);
    } finally {
      localStorage.removeItem("round");
      localStorage.removeItem("lobby");
      localStorage.removeItem("leaderboard")
      localStorage.removeItem("gamemode")
      localStorage.removeItem("authKey");
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
      console.log("addNotification", text, type);
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
          {(parseInt(localStorage.getItem("round"), 10) === 5) ? (
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
        <BaseElementLobby elements={JSON.parse(localStorage.getItem("leaderboard"))} />
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