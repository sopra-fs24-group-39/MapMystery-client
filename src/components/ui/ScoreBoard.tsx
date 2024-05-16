import React, { useState, useEffect } from 'react';
import "../../styles/ui/ScoreBoard.scss";
import "../../styles/_theme.scss";

type ScoreBoardProps = {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  onTimeExpired?: () => void;
  currentRound: number;
  totalRounds: number;
  initialTime?: number;
};

const Timer: React.FC<{ time: number; onTimeExpired?: () => void }> = ({ onTimeExpired, time }) => {
  const [localTime, setLocalTime] = useState(time);

  useEffect(() => {
    setLocalTime(time);
  }, [time]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime((currentTime) => {
        if (currentTime > 1) {
          return currentTime - 1;
        } else {
          clearInterval(timer);
          if (onTimeExpired) {
            onTimeExpired();
          }
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(localTime / 60);
    const seconds = localTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <div className="timer-header">{formatTime()}</div>
    </div>
  );
};

type RoundProps = {
  currentRound: number;
  totalRounds: number;
};

const Round: React.FC<RoundProps> = ({ currentRound, totalRounds }) => {
  return (
    <div className="round-info">
      {currentRound}/{totalRounds} Rounds
    </div>
  );
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  onTimeExpired,
  children,
  currentRound,
  totalRounds,
  width = '25%',
  height = '15%',
  initialTime = 60
}) => {
  const [timerTime, setTimerTime] = useState(initialTime);

  const style = { width, minHeight: height };

  return (
    <div className="base-elements" style={style}>
      <Timer time={timerTime} onTimeExpired={onTimeExpired} />
      <Round currentRound={currentRound} totalRounds={totalRounds} />
    </div>
  );
};

export default ScoreBoard;
