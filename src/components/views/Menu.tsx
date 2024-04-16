import React from "react";
import Button from "components/ui/Button";
import "styles/views/Menu.scss";
import "styles/index.scss";
import "styles/views/Start.scss";
import BaseContainer from "components/ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Header from "./Header";
import Logo from "../pictures/Logo";

const Menu = () => {
  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <div className={"center-container"}>
          <Header/>
          <Logo width="300px" height="300px" className="logo" />
          <div className="text-container">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <div className={"menu-buttons-container"}>
            <Button
              type={"regular"}
              width={"lg"}
              name={"Create Game"}>
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
      </div>
    </BaseContainer>
  );
};

export default Menu;
