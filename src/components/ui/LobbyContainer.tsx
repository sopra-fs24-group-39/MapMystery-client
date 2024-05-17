import React from 'react';
import "../../styles/ui/LobbyContainer.scss";

type BaseElementLobbyProps = {
  elements?: Record<string, number> | null;
  sp?: boolean;
};

const BaseElementLobby: React.FC<BaseElementLobbyProps> = ({ elements, sp }) => {
  // Default players setup
  const defaultElements = {
    "Waiting for players...": 0,
  };

  const defaultElements2 = {
    "Game is starting soon": 0,
  };

  // Use elements or default if elements is null or undefined
  const validElements = elements ?? (sp ? defaultElements2 : defaultElements);
  const isDefault = validElements === defaultElements || validElements === defaultElements2;

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
          {sp ? "Game is starting soon..." : "Waiting for players, game will start automatically..."}
        </div>
      ) : (
        sortedElements
      )}
    </div>
  );
};

export default BaseElementLobby;
