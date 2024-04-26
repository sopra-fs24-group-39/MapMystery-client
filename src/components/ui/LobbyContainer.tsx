import React from 'react';
import "../../styles/ui/LobbyContainer.scss";

type BaseElementLobbyProps = {
  elements?: Record<string, number> | null;
};

const BaseElementLobby: React.FC<BaseElementLobbyProps> = ({ elements }) => {
  // Default players setup
  const defaultElements = {
    "Player 1": 0,
    "Player 2": 0,
    "Player 3": 0
  };

  // Use elements or default if elements is null or undefined
  const validElements = elements ?? defaultElements;
  const hasElements = Object.keys(validElements).length > 0;

  if (!hasElements) return null;

  const sortedElements = Object.entries(validElements)
    .sort((a, b) => b[1] - a[1])
    .map(([name, points], index) => (
      <div key={name} className={`element-item ${index % 2 === 0 ? 'dark-blue' : 'light-blue'}`}>
        {index + 1}. {name}: {Math.round(points)} points
      </div>
    ));

  const style = { width: '800px', minHeight: '500px' };
  return (
    <div className="base-element-lobby" style={style}>
      {sortedElements}
    </div>
  );
};

export default BaseElementLobby;
