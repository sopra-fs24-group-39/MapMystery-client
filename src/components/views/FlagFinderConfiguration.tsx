import React, { useState, useEffect } from "react";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import GameInputFlagFinder from "./GameInputFlagFinder";
import ScoreBoard from "components/ui/ScoreBoard";
import BackgroundImage from "./sources/background.png";
import { useLocation, useNavigate } from "react-router-dom";
import { webSocketService } from './WebSocketService';
import { api, handleError } from "helpers/api";
import Button from "components/ui/Button";
import Title from "components/ui/Title";
import "../../styles/views/FlagFinderConfiguration.scss";
import RoundAndTimeSelection from "components/ui/Configurator";

interface FlagFinderConfiguratorProps {

}

const FlagFinderConfigurator: React.FC<FlagFinderConfiguratorProps> = ({ }) => {
  const navigate = useNavigate();
  const [secondsPerRound, setSecondsPerRound] = useState(30);
  const [rounds, setRounds] = useState(5);

  const handleSelectionChange = (rounds: number, secondsPerRound: number) => {
    setRounds(rounds);
    setSecondsPerRound(secondsPerRound);
    console.log(`Selected Rounds: ${rounds}, Seconds per Rounad: ${secondsPerRound}`);
  }

  const handleStartGame = () => {
    console.log("Start Game");
    const roundsArray = new Array(rounds).fill('?');
    localStorage.setItem("roundsInfo", JSON.stringify(roundsArray));
    navigate(`/country?sec=${secondsPerRound}&currentRound=1&rounds=${rounds}`);
  }

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header />
        <Title text="Flag Finder" className="site-title" size="md"></Title>
        <div className="flag-info">
          <p>Choose the amount of rounds you want to play</p>
          <p>And how long each round should last</p>
        </div>
        <div className="config-box">
          <RoundAndTimeSelection onSelectionChange={handleSelectionChange} />
        </div>
        <Button type={"regular"} width={"lg"} name={"Start Game"} onClick={(handleStartGame)}></Button>
      </div>
    </BaseContainer>
  );
};

export default FlagFinderConfigurator;
