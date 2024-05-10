import React, { useState } from 'react';
import "../../styles/ui/Configurator.scss";

interface Props {
  onSelectionChange: (rounds: number, secondsPerRound: number) => void;
}

const RoundAndTimeSelection: React.FC<Props> = ({ onSelectionChange }) => {
  const [rounds, setRounds] = useState(5);
  const [secondsPerRound, setSecondsPerRound] = useState(30);

  const handleRoundsIncrement = () => {
    const newRounds = rounds + 1;
    if (newRounds <= 20) {
      setRounds(newRounds);
      onSelectionChange(newRounds, secondsPerRound);
    }
  };

  const handleRoundsDecrement = () => {
    const newRounds = rounds - 1;
    if (newRounds >= 1) {
      setRounds(newRounds);
      onSelectionChange(newRounds, secondsPerRound);
    }
  };

  const handleSecondsIncrement = () => {
    const newSeconds = secondsPerRound + 5;
    if (newSeconds <= 90) {
      setSecondsPerRound(newSeconds);
      onSelectionChange(rounds, newSeconds);
    }
  };

  const handleSecondsDecrement = () => {
    const newSeconds = secondsPerRound - 5;
    if (newSeconds >= 5) {
      setSecondsPerRound(newSeconds);
      onSelectionChange(rounds, newSeconds);
    }
  };

  return (
    <div className="configurator">
      <div className="number-selector">
        <label htmlFor="rounds">Number of Rounds:</label>
        <button onClick={handleRoundsDecrement} disabled={rounds === 1} className="arrow down"></button>
        <input
          type="number"
          id="rounds"
          name="rounds"
          readOnly
          value={rounds}
        />
        <button onClick={handleRoundsIncrement} disabled={rounds === 20} className="arrow up"></button>
      </div>
      <div className="number-selector">
        <label htmlFor="seconds-per-round">Seconds per Round:</label>
        <button onClick={handleSecondsDecrement} disabled={secondsPerRound === 5} className="arrow down"></button>
        <input
          type="number"
          id="seconds-per-round"
          name="seconds-per-round"
          readOnly
          value={secondsPerRound}
        />
        <button onClick={handleSecondsIncrement} disabled={secondsPerRound === 90} className="arrow up"></button>
      </div>
    </div>
  );
};

export default RoundAndTimeSelection;
