import React from 'react';
import "../../styles/ui/GameStatistics.scss";

type GameStatisticsProps = {
  currentpoints: number;
  pointsthismonth: number;
};

const GameStatistics: React.FC<GameStatisticsProps> = ({ currentpoints, pointsthismonth }) => {
  return (
    <div className="gamestats">
      <h2 className="gamestats-title">Game Statistics</h2>
      <h3 className="gamestats-gamemode">GlobeGuesser</h3>
      <div className="gamestats-info">
        <span className="gamestats-label">Games Played:</span>
        <span className="gamestats-value">Coming Soon</span>
      </div>
      <div className="gamestats-info">
        <span className="gamestats-label">Time Played:</span>
        <span className="gamestats-value">Coming Soon</span>
      </div>
      <div className="gamestats-info">
        <span className="gamestats-label">Current Points:</span>
        <span className="gamestats-value">{currentpoints}</span>
      </div>
      <div className="gamestats-info">
        <span className="gamestats-label">Points This Month:</span>
        <span className="gamestats-value">{pointsthismonth}</span>
      </div>
      <h3 className="gamestats-gamemode">FlagFinder</h3>
      <div className="gamestats-info">
        <span className="gamestats-label">Games Played:</span>
        <span className="gamestats-value">Coming Soon</span>
      </div>
      <div className="gamestats-info">
        <span className="gamestats-label">Time Played:</span>
        <span className="gamestats-value">Coming Soon</span>
      </div>
      <div className="gamestats-info">
        <span className="gamestats-label">Current Points:</span>
        <span className="gamestats-value">Coming Soon</span>
      </div>
      <div className="gamestats-info">
        <span className="gamestats-label">Points This Month:</span>
        <span className="gamestats-value">Coming Soon</span>
      </div>
    </div>
  );
};

export default GameStatistics;
