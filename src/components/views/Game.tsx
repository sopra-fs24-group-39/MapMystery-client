import { React, useState} from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import "styles/ui/DropDown.scss";
import Button from "../ui/Button";
import BackgroundImage from "./sources/background.png";
import Header from "./Header";
import Logo from "../pictures/Logo";
import DropDown from "../ui/DropDown";
import Timer from "../ui/Timer";
import {useNavigate} from "react-router-dom";

const Game = () => {
  const [playerMS, setPlayerMS] = useState("");
  const [gameMode, setGameMode] = useState("");
  const [mp, setMp] = useState("");
  const [sp, setSp] = useState("hidden");
  const [timer, setTimer] = useState("hidden");
  const [text, setText] = useState("");

  function populateBeforeAPICall() {
    setGameMode(localStorage.getItem("gamemode"));
    if (mp === "hidden"){
      setPlayerMS("Singleplayer");
    } else {
      setPlayerMS("Multiplayer");
    }
    setTimer("");
    setText("hidden");
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

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container left-5"}>
        <Header/>
        <Logo width="200px" height="200px" className="logo" />
        <div className="text-container-sm">
          <p className={text}> Select your preferences and join a lobby</p>
          <p className={timer}><Timer></Timer></p>
        </div>
        <div className={"menu-buttons-container"}>
          <Button
            type={"regular"}
            width={"lg"}
            name={"Create Game"}
          >
          </Button>
          <div className={"menu-mpsp-select mt-3"}>
            <div className={"flex flex-row items-center"}
                 onClick={handleMPlayer}>
              <div className={"arrow-right "+mp}></div>
              <Button
                type={"regular"}
                width={"md"}
                name={"Multiplayer"}>
              </Button>
            </div>
            <div className={"flex flex-row items-center"}
                 onClick={handleSPlayer}>
              <div className={"arrow-right "+sp}></div>
              <Button
                type={"regular"}
                width={"md"}
                name={"Singleplayer"}>
              </Button>
            </div>
          </div>
          <div className={"mt-3"}>
            <DropDown defaultValue={"Select Gamemode"}
                      altValues={["Globe Guesser", "Flag Finder", "Geo Genius"]}>
            </DropDown>
          </div>
          <div className={"mt-3"}
               onClick={populateBeforeAPICall}>
            <Button type={"regular"}
                    width={"lg"}
                    name={"Start!"}>
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Game;
