import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import Title from "components/ui/Title";
import GlobeGuesserDistance from "components/ui/GlobeGuesserDistance";
import BackgroundImage from "./sources/background.png";
import "../../styles/ui/GlobeGuesserDistanceScreen.scss";

const GlobeGuesserDistanceScreen = () => {

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header/>
      </div>
      <div className="main-body-distance">
          <Title text="Your Guess:" className="site-title" size={"md"}></Title>
        <GlobeGuesserDistance/>
      </div>
    </BaseContainer>
  );
};

export default GlobeGuesserDistanceScreen;
