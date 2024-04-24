import React from "react";
import BaseContainer from "../ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Header from "./Header";
import Title from "../ui/Title";
import Container from "../ui/Container";
import Button from "../ui/Button";

const GlobeGuesserLobby = () => {

  function leaveLobby() {
    return;
  }



  return(
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header />
        <Title text={"Globe Guesser"} size={"md"}></Title>
        <Container></Container>
        <div onClick={leaveLobby}>
          <Button width={"md"}
                  type={"regular"}
                  name={"Leave Game"}>
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
}

export default GlobeGuesserLobby;