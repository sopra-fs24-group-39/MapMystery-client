import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds === 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, onTimeUp]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <span>
      Timer: {formatTime(seconds)}
    </span>
  );
};

export default Timer;
