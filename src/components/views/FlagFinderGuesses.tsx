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
import "../../styles/views/FlagFinderGuesses.scss";
import RoundAndTimeSelection from "components/ui/Configurator";

const FlagFinderGuesses: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sec = parseInt(queryParams.get("sec") || "30");
  const rounds = parseInt(queryParams.get("rounds") || "5");
  const currentRound = parseInt(queryParams.get("currentRound") || "1");
  const resultRound = currentRound - 1;
  const resultsData = localStorage.getItem('roundsInfo');
  let results = resultsData ? JSON.parse(resultsData) : new Array(rounds).fill('?');

  const handleNextRound = () => {
    navigate(`/country?sec=${sec}&currentRound=${currentRound}&rounds=${rounds}`);
  };

  const handleLeaveGame = () => {
    localStorage.removeItem('roundsInfo');
    navigate('/game');
  };

  useEffect(() => {
    let timer;
    if (currentRound === rounds+1) {
      timer = setTimeout(() => {
        handleLeaveGame();
      }, 10000);
    }

    return () => {
        if (timer) {
          clearTimeout(timer);
        }
    };
  }, [currentRound, rounds, handleNextRound]);

  const countCorrectGuesses = () => {
    return results.reduce((acc, result) => {
      if (result !== '?' && result[0]) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header />
        {resultRound === rounds ? (
          <div>
            <Title text="Final Scores" className="site-title" size="md" />
            <div className="score-summary">
              {`You got ${countCorrectGuesses()} out of ${rounds} correct!`}
            </div>
          </div>
        ) : (
          <Title text="Your Guesses" className="site-title" size="md" />
        )}
        <div className="flag-scores">
          {results.map((result, index) => (
            <div key={index} className={`score-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
              {result === '?' ? '?' : (
                <>
                  <span>Result: {result[0] ? 'Correct' : 'False'}</span>
                  <span>Your Guess: {result[1] ? result[1] : 'no submission'}</span>
                  <span>Correct Answer: { result[2]}</span>
                </>
              )}
            </div>
          ))}
        </div>
        {resultRound === rounds ? (
          <Button type={"regular"} width={"lg"} name={"Leave Game"} onClick={handleLeaveGame} />
        ) : (
          <>
            <Button type={"regular"} width={"lg"} name={"Next Round"} onClick={handleNextRound} />
            <Button type={"regular"} width={"lg"} name={"Leave Game"} onClick={handleLeaveGame} />
          </>
        )}
      </div>
    </BaseContainer>
  );
};

export default FlagFinderGuesses;
