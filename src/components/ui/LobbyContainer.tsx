import React from 'react';
import "../../styles/ui/LobbyContainer.scss";

type BaseElementLobbyProps = {
  elements?: Record<string, number> | null;
};

const BaseElementLobby: React.FC<BaseElementLobbyProps> = ({ elements }) => {
  // Default players setup
  const defaultElements = {
    "Waiting for players...": 0,
  };

  // Use elements or default if elements is null or undefined
  const validElements = elements ?? defaultElements;
  const isDefault = validElements === defaultElements;

  if (Object.keys(validElements).length === 0) return null;

  const sortedElements = Object.entries(validElements)
    .sort((a, b) => b[1] - a[1])
    .map(([name, points], index) => (
      <div key={name} className={`element-item ${index % 2 === 0 ? 'dark-blue' : 'light-blue'}`}>
        {index + 1}. {name}: {Math.round(points)} points
      </div>
    ));

  const style = { width: '60vw', minHeight: '50vh' };
  return (
    <div className="base-element-lobby" style={style}>
      {isDefault ? (
        <div className="default-text">
          Waiting for players, game will start automatically...
        </div>
      ) : (
        sortedElements
      )}
    </div>
  );
};

export default BaseElementLobby;
