import React, { useState, useEffect, useCallback, useRef } from "react";
import BaseContainer from "components/ui/BaseContainer";
import Header from "components/views/Header";
import GameInputFlagFinder from "./GameInputFlagFinder";
import ScoreBoard from "components/ui/ScoreBoard";
import BackgroundImage from "./sources/background.png";
import { useLocation, useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";

const FlagFinder: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sec = parseInt(queryParams.get("sec") || "30");
  const rounds = parseInt(queryParams.get("rounds") || "5");
  const currentRound = parseInt(queryParams.get("currentRound") || "1");

  const [currentCode, setCurrentCode] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [guessCode, setGuessCode] = useState("");
  const [guessName, setGuessName] = useState("");

  const currentCodeRef = useRef(currentCode);
  const currentNameRef = useRef(currentName);
  const guessCodeRef = useRef(guessCode);
  const guessNameRef = useRef(guessName);

  useEffect(() => {
    currentCodeRef.current = currentCode;
    currentNameRef.current = currentName;
    guessCodeRef.current = guessCode;
    guessNameRef.current = guessName;
  }, [currentCode, currentName, guessCode, guessName]);

  async function getCode() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Authorization": `${token}`
      };
      const response = await api.get("Lobby/GameMode2/country", { headers });
      setCurrentCode(response.data.code);
      setCurrentName(response.data.country);
    } catch (error) {
      console.error("Error fetching data:", error);
      handleError(error);
    }
  }

  useEffect(() => {
    getCode();
  }, []);

  const handleCountryUpdate = (countryName, countryCode) => {
    setGuessCode(countryCode);
    setGuessName(countryName);
  };

  const handleSubmit = useCallback(() => {
    const resultsData = localStorage.getItem('roundsInfo');
    let results = resultsData ? JSON.parse(resultsData) : new Array(rounds).fill(null);

    const index = currentRound - 1;

    const currentCode = currentCodeRef.current;
    const currentName = currentNameRef.current;
    const guessCode = guessCodeRef.current;
    const guessName = guessNameRef.current;

    if (guessCode === currentCode && guessCode !== "") {
      console.log("Correct");
      results[index] = [true, guessName, currentName];
    } else {
      console.log("Incorrect");
      results[index] = [false, guessName, currentName];
    }

    localStorage.setItem('roundsInfo', JSON.stringify(results));
    navigate(`/ffguesses?sec=${sec}&currentRound=${currentRound + 1}&rounds=${rounds}`);
  }, [currentRound, rounds, navigate, sec]);

  const onTimeExpired = useCallback(() => {
    setGuessCode("");
    setGuessName("");
    handleSubmit();
  }, [handleSubmit]);

  return (
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className={"center-container"}>
        <Header />
        <ScoreBoard onTimeExpired={onTimeExpired} initialTime={sec} currentRound={currentRound} totalRounds={rounds} code={currentCode} name={currentName}/>
        <GameInputFlagFinder onCountryUpdate={handleCountryUpdate} onSubmit={handleSubmit} code={currentCode} currentName={currentName} />
      </div>
    </BaseContainer>
  );
};

export default FlagFinder;
