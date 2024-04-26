import React, {useState}  from 'react';
import "../../styles/ui/FriendsContainer.scss";

// Mock data
const friends = [
  {status: 'online', name: 'StarlightSprinter', GlobeGuesser: '1231 / #12', FlagFinder: '1911 / #2', GeoGenius: '209 / #234'},
  {status: 'online', name: 'QuantumQuest', GlobeGuesser: '1231 / #12', FlagFinder: '1911 / #2', GeoGenius: '209 / #234'},
  {status: 'offline', name: 'EchoEnigma', GlobeGuesser: '1231 / #12', FlagFinder: '1911 / #2', GeoGenius: '209 / #234'},
  {status: 'online', name: 'NebulaNavigator', GlobeGuesser: '1231 / #12', FlagFinder: '1911 / #2', GeoGenius: '209 / #234'},
  {status: 'offline', name: 'PixelPioneer', GlobeGuesser: '1231 / #12', FlagFinder: '1911 / #2', GeoGenius: '209 / #234'},
  {status: 'offline', name: 'CyberSorcerer', GlobeGuesser: '1231 / #12', FlagFinder: '1911 / #2', GeoGenius: '209 / #234'},
  {status: 'offline', name: 'MysticMerlin', GlobeGuesser: '1231 / #12', FlagFinder: '1911 / #2', GeoGenius: '209 / #234'},
  {status: 'online', name: 'GalacticGuardian', GlobeGuesser: '1231 / #12', FlagFinder: '1911 / #2', GeoGenius: '209 / #234'},
];

interface BaseElementFriendsProps {
  width?: string;
  height?: string;
}

const BaseElementFriends: React.FC<BaseElementFriendsProps> = ({ width = '800px', height = '500px' }) => {
  const style = { width, minHeight: height };
  const [expandedRows, setExpandedRows] = useState({});

  const toggleDetails = (index) => {
    const newExpandedRows = { ...expandedRows, [index]: !expandedRows[index] };
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="base-element-friends" style={style}>
      {friends.map((friend, index) => (
        <div key={index} className={`player-row ${index % 2 === 0 ? 'light-stripe' : 'dark-stripe'} ${expandedRows[index] ? 'expanded' : ''}`}>
          <div className="visible-details">
            <button onClick={() => toggleDetails(index)} className="toggle-details">
              {expandedRows[index] ? '▶' : '▼'}
            </button>
            <div className="player-name">{friend.name}</div>
            {expandedRows[index] && (
              <>
                <div className="player-globe">GlobeGuesser: {friend.GlobeGuesser}</div>
                <div className="player-flag">FlagFinder: {friend.FlagFinder}</div>
                <div className="player-geo">GeoGenius: {friend.GeoGenius}</div>
              </>
            )}
            <div className={`player-status ${friend.status === 'online' ? 'online' : 'offline'}`}>
              {friend.status}
            </div>
            {expandedRows[index] && (
              <>
                <button className="invite-button">Invite</button>
                <button className="delete-button">Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BaseElementFriends;

