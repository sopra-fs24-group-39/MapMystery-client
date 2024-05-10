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
import GameInfo from "../ui/GameInfo";

const showGameInformation = (stat) => {
  if (stat) {
    return (
      <div className={"full-h-w z-20"} style={{position: "absolute"}}>
        <GameInfo></GameInfo>
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

  const handleInformationPopUp = () => {
    setIsInfo(!isInfo);
  }

  function populateBeforeAPICall() {
    const selectedGameMode = localStorage.getItem("gamemode");
    if (!selectedGameMode) {
      setText("Please select a game mode before starting the game");
      console.log("No game mode selected");
      return;
    }

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
        console.log(user)
        var lobbyId = await join_lobby(user)
        localStorage.setItem("lobby", lobbyId)
        console.log(`(Game.tsx) set lobby id in local storage ${localStorage.getItem("lobby")}`)
        navigate("/lobby");
        setTimerActive(false);
    } catch (error) {
        console.error('Failed to fetch user:', error);
    }
}

async function join_lobby(userData){
  const token = localStorage.getItem("token");
  const userDTO = prepareUserDTO(userData);
  console.log(userDTO)
  const config = {
    headers: {
      Authorization: `${token}`
    }
  };
  try {
    const response = await api.post('/Lobby/GameMode1', userDTO, config);
    var lobbyId =  response.data.lobbyId
    console.log("LobbyId:", lobbyId)
    return lobbyId
  } catch (error) {
    console.error('Failed to join lobby:', error.response.data);
  }
}

function prepareUserDTO(userData) {
    return {
        id: userData.id,
    };
}


  function handleMPlayer() {
    if (sp === "") {
      setSp("hidden");
      setMp("");
    }
  }

  function handleSPlayer() {
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

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body overflow-scroll">
      {showGameInformation(isInfo)}
      <div className={"center-container left-5"}>
        <Header/>
        <Logo width="40vh" height="40vh" className="logo" />
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
          <div onClick={handlePrivateSwitch}>
            <Button
              type={"regular"}
              width={"lg"}
              name={"Create or join a private Game"}
            >
            </Button>
          </div>
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
                handleInformationPopUp()
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
    </BaseContainer>
  );
};

export default Game;
