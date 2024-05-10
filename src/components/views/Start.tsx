import { React, useState } from "react";
import Button from "components/ui/Button";
import Header from "components/views/Header";
import Logo from "components/pictures/Logo";
import "styles/views/Start.scss";
import BaseContainer from "components/ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Login from "../ui/Login";

const showLoginForm = (stat) => {
  if (stat) {
    return (
      <div className={"full-h-w"} style={{position: "absolute"}}>
        <Login></Login>
      </div>
    );
  }
  return (
    <></>
  );
}

const Start = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isPlayButton, setIsPlayButton] = useState(1);

  const handleClick = () => {
    setIsLogin(!isLogin);
    setIsPlayButton(-1*isPlayButton);
  }

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      {showLoginForm(isLogin)}
      <div className={"center-container"}>
        <Header/>
        <Logo width="40vh" height="40vh" className="logo" />
        <div className="text-container">
          <p>Explore the world from the comfort of your home</p>
        </div>
        <div className={"start-buttons-container"}
             style={{zIndex: isPlayButton }}
             onClick={handleClick}>
          <Button
            type={"regular"}
            width={"lg"}
            name={"Play"}>
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Start;
