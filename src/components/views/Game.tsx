import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import Button from "../ui/Button";
import BackgroundImage from "./sources/background.png";
import Header from "./Header";
import Logo from "../pictures/Logo";
import {useNavigate} from "react-router-dom";

const Game = () => {
  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container left-5"}>
        <Header/>
        <Logo width="300px" height="300px" className="logo" />
        <div className="text-container-sm">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className={"menu-buttons-container"}>
          <Button
            type={"regular"}
            width={"lg"}
            name={"Create Game"}
          >
          </Button>
          <Button
            type={"regular"}
            width={"lg"}
            name={"Gamemode Selection"}>
          </Button>
          <div className={"menu-mpsp-select"}>
            <Button
              type={"regular"}
              width={"md"}
              name={"Multiplayer"}>
            </Button>
            <Button
              type={"regular"}
              width={"md"}
              name={"Singleplayer"}>
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Game;
