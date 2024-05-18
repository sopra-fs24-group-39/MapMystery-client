import React, { useState, useEffect } from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import "styles/ui/DropDown.scss";
import Button from "../ui/Button";
import BackgroundImage from "./sources/background.png";
import Header from "./Header";
import Logo from "../pictures/Logo";
import DropDown from "../ui/DropDown";
import Timer from "../ui/Timer";
import { api, handleError } from "helpers/api";
import { useNavigate } from "react-router-dom";
import GlobeGuesserInfo from "../ui/GlobeGuesserInfo";
import FlagFinderInfo from "../ui/FlagFinderInfo";
import NotificationSquare from "components/ui/NotificationSquare";
import ChatButton from "../ui/ChatButton";
import { webSocketService } from "components/views/WebSocketService";

const showGLobeGuesserInformation = (stat) => {
  if (stat) {
    return (
      <div className={"full-h-w z-20"} style={{position: "absolute"}}>
        <GlobeGuesserInfo></GlobeGuesserInfo>
      </div>
    );
  }
}

const Game = () => {
  const navigate = useNavigate();
  const [playerMS, setPlayerMS] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [mp, setMp] = useState("");
  const [sp, setSp] = useState("hidden");
  const [timerActive, setTimerActive] = useState(false);
  const [text, setText] = useState("Select your preferences and join a lobby");
  const [isInfo, setIsInfo] = useState(false);
  const [isRandomLobby, setIsRandomLobby] = useState("hidden");
  const [isLobbySelection, setIsLobbySelection] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [infoGameMode, setInfoGameMode] = useState("");

  const handleInformationPopUp = (gameMode) => {
      setInfoGameMode(gameMode);
      setIsInfo(!isInfo);
  }

  const handleRandomLobby = () => {
    if(isLobbySelection === "") {
      setIsRandomLobby("");
      setIsLobbySelection("hidden");
    } else {
      setIsRandomLobby("hidden");
      setIsLobbySelection("");
    }
  }

  function populateBeforeAPICall() {
    const selectedGameMode = localStorage.getItem("gamemode");
    if (!selectedGameMode) {
      setText("Please select a game mode before starting the game");
      console.log("No game mode selected");
      return;
    }
    webSocketService.disconnect();
    setGameMode(selectedGameMode);
    if (mp === "hidden") {
      setPlayerMS("Singleplayer");
    } else {
      setPlayerMS("Multiplayer");
    }
    setTimerActive(true);
    setText("");
  }

  async function onTimeUp() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    console.log(userId)
    console.log(token)

    if (localStorage.getItem("gamemode") === "Flag Finder") {
      navigate("/ffconfiguration");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `${token}`
        }
      };
      var user = await api.get(`/users/${userId}`, config);
      user = user.data

      if (playerMS === "Multiplayer") {
        var lobbyId = await join_lobby(user)
        localStorage.setItem("lobby", lobbyId)
        localStorage.setItem("counter", "starting round counter")
        navigate("/lobby");
        setTimerActive(false);
      } else if (playerMS === "Singleplayer") {
        var lobbyId = await join_single_lobby(user)
        localStorage.setItem("lobby", lobbyId)
        localStorage.setItem("counter", "starting round counter")
        localStorage.setItem("Singleplayer", true)
        navigate("/lobby?gm=sp");
        setTimerActive(false);
      } else {
        addNotification("Gamemode not select", "error");
        return;
      }
    } catch (error) {
        addNotification("Player not found", "error");
    }
  }

  async function join_lobby(userData){
    const token = localStorage.getItem("token");
    const userDTO = prepareUserDTO(userData);
    const config = {
      headers: {
        Authorization: `${token}`
      }
    };
    try {
      const response = await api.post('/Lobby/GameMode1', userDTO, config);
      var lobbyId =  response.data.lobbyId
      return lobbyId
    } catch (error) {
      addNotification("Failed to join lobby", "error");
    }
  }

  async function join_single_lobby(userData) {
    const token = localStorage.getItem("token");
    const userDTO = prepareUserDTO(userData);
    const config = {
      headers: {
        Authorization: `${token}`
      }
    };
    try {
      const response = await api.post('/Lobby/GameMode3', userDTO, config);
      var lobbyId =  response.data.lobbyId
      return lobbyId
    } catch (error) {
      addNotification("Failed to join Singleplayer lobby", "error");
    }
  }

function prepareUserDTO(userData) {
    return {
        id: userData.id,
    };
}


  function handleMPlayer() {
    addNotification("Multiplayer selected", "win");
    if (sp === "") {
      setSp("hidden");
      setMp("");
    }
  }

  function handleSPlayer() {
    addNotification("Singleplayer selected");
    if (mp === "") {
      setSp("");
      setMp("hidden");
    }
  }

  function cancelTimer() {
    setTimerActive(false);
  }

  function handlePrivateSwitch() {
    navigate("/privateLobby");
  }

  const addNotification = (text, type) => {
    setNotifications(prevNotifications => [
      ...prevNotifications,
      { id: Date.now(), text, type }
    ]);
  }

  const removeNotification = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  }

  const handleChatButtonClick = () => {
      console.log("Button clicked");
  };

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body overflow-scroll">
      {isInfo && (
        <div className={"full-h-w z-20"} style={{position: "absolute"}}>
          {infoGameMode === "Globe Guesser" && <GlobeGuesserInfo />}
          {infoGameMode === "Flag Finder" && <FlagFinderInfo />}
        </div>
      )}
      <NotificationSquare
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <div className={"center-container left-5"}>
        <Header/>
        <Logo width="40vh" height="40vh" className="logo" />

        <ChatButton
          width="large"
          onClick={handleChatButtonClick}
          icon="Chat"
          notificationCount={3}
        />

        <div className="text-container-sm">
           <p className={text}>{text !== "hidden" ? text : "Select your preferences and join a lobby"}</p>
           <p className={"text-info"}>For more information on the game modes click the information icon in the game mode selection</p>
          {timerActive && (
            <>
              <p><Timer initialSeconds={5} onTimeUp={onTimeUp} /></p>
            </>
          )}
        </div>
        <div className={"menu-buttons-container"}>
        {/*
          <div onClick={handleInformationPopUp}>
            <p className={"text-white"}>Click here for more information about the game</p>
            <br />
          </div>
        */}
          <div className={isLobbySelection}>
            <div onClick={handlePrivateSwitch}>
              <Button
                type={"regular"}
                width={"lg"}
                name={"Play in a private lobby"}
              >
              </Button>
            </div>
            <div className={"mt-3"} onClick={handleRandomLobby}>
              <Button
                type={"regular"}
                width={"lg"}
                name={"Join a random public game"}
              >
              </Button>
            </div>
          </div>
          <div className={isRandomLobby}>
            <div className={"menu-mpsp-select mt-3"}>
              <div className={"flex flex-row items-center"} onClick={handleMPlayer}>
                <div className={"arrow-right " + mp}></div>
                <Button
                  type={"regular"}
                  width={"md"}
                  name={"Multiplayer"}>
                </Button>
              </div>
              <div className={"flex flex-row items-center"} onClick={handleSPlayer}>
                <div className={"arrow-right " + sp}></div>
                <Button
                  type={"regular"}
                  width={"md"}
                  name={"Singleplayer"}>
                </Button>
              </div>
            </div>
            <div className={"mt-3"}>
              <DropDown
                defaultValue={"Select Gamemode"}
                altValues={["Globe Guesser", "Flag Finder"]}
                onInfoClick={(gameMode) => {
                  handleInformationPopUp(gameMode);
                }}
              />
            </div>
            <div className={"mt-3"}>
              <Button
                type={"regular"}
                width={"lg"}
                name={"Start!"}
                onClick={populateBeforeAPICall}
              >
              </Button>
              <div className={"flex flex-row justify-center"}>
                <a className={"text mt-4"} href={"/game"}>Back</a>
              </div>
              {timerActive && (
                <Button
                  type={"login"}
                  width={"lg"}
                  name={"Cancel"}
                  onClick={cancelTimer}
                >
                </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Game;