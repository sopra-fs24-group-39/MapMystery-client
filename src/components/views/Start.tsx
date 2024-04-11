import React from "react";
import Button from "components/ui/Button";
import Header from "components/views/Header";
import Logo from "components/pictures/Logo";
import BaseElement from "components/ui/Container";
import "styles/views/Start.scss";
import BaseContainer from "components/ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import { useNavigate } from "react-router-dom";

const Start = () => {
  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header/>
        <Logo width="400px" height="400px" className="logo" />
        <div className="text-container">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <div className={"start-buttons-container"}>
          <Button
            type={"lg"}
            name={"Play"}>
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Start;
