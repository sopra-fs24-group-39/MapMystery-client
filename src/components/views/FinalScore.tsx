import { React, useState } from "react";
import Button from "components/ui/Button";
import Header from "components/views/Header";
import Logo from "components/pictures/Logo";
import "styles/views/FinalScore.scss";
import BaseContainer from "components/ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Podium from "components/ui/Podium";


const FinalScore = () => {
  const first = { name: 'Alice', points: 100 };
  const second = { name: 'Bob', points: 80 };
  const third = { name: 'Charlie', points: 60 };


  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header/>
        <div className="podium-container">
          <Podium first={first} second={second} third={third} />
        </div>
      </div>
    </BaseContainer>
  );
};

export default FinalScore;
