import React, { useState, useEffect } from 'react';
import "../../styles/ui/ScoreBoard.scss";
import "../../styles/_theme.scss";


const players = [
  {name: 'StarlightSprinter', points: '123'},
  {name: 'QuantumQuest', points: '98'},
  {name: 'EchoEnigma', points: '85'},
  {name: 'NebulaNavigator', points: '52'},
  {name: 'PixelPioneer', points: '31'},
]

type ScoreBoardProps = {
  children?: React.ReactNode;
  width?: string;
  height?: string;
};

type TimerProps = {
  initialTime: number;
};

type RoundProps = {
  currentRound: number;
  totalRounds: number;
};

type PlayersListProps = {
  players: Player[];
};

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    setTime(initialTime); // This will update the time whenever initialTime changes
  }, [initialTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(timer); // Stop the timer when it reaches 0
      }
    }, 1000);
    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [time, initialTime]); // Depend on initialTime to reset the interval when it changes

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <div className="timer-header">{formatTime()}</div>
    </div>
  );
};

const Round: React.FC<RoundProps> = ({ currentRound, totalRounds }) => {
  return (
    <div className="round-info">
      {currentRound}/{totalRounds} Rounds
    </div>
  );
};

type Player = {
  name: string;
  points: string;
};

const PlayersList: React.FC<PlayersListProps> = ({ players }) => {
  // Sort players by points in descending order
  const sortedPlayers = [...players].sort((a, b) => parseInt(b.points) - parseInt(a.points));

  return (
    <div className="players-list">
      {sortedPlayers.map((player, index) => (
        <div
          key={player.name}
          className={`player ${player.name === 'QuantumQuest' ? 'highlighted' : ''} ${index % 2 === 0 ? 'dark' : 'light'}`}
        >
          {player.name} - {player.points} Points
        </div>
      ))}
    </div>
  );
};


const ScoreBoard: React.FC<ScoreBoardProps> = ({ children, width = '25%', height = '56%' }) => {
  const [timerTime, setTimerTime] = useState(180);
  const [currentRound, setCurrentRound] = useState(3);
  const [totalRounds, setTotalRounds] = useState(5);

  const style = { width, minHeight: height };
  const setCustomTime = (newTime: number) => {
    setTimerTime(newTime);
  };

  const setRound = (newRound: number) => {
    if (newRound <= totalRounds && newRound >= 1) {
      setCurrentRound(newRound);
    }
  };

  {/*         <button onClick={() => setRound(currentRound + 1)}>Next Round</button>
              <button onClick={() => setCustomTime(15)}>Set 15 Seconds</button>
  */}

  return (
    <div className="base-elements" style={style}>
      <Timer initialTime={timerTime} />
      <Round currentRound={currentRound} totalRounds={totalRounds} />
      <PlayersList players={players} />
    </div>
  );
};

export default ScoreBoard;
