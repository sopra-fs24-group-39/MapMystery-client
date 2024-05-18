import React, {useState, useEffect}  from 'react';
import "../../styles/ui/FriendsContainer.scss";
import { api, handleError } from "helpers/api";
import NotificationSquare from "components/ui/NotificationSquare";

interface BaseElementFriendsProps {
  width?: string;
  height?: string;
}

const BaseElementFriends: React.FC<BaseElementFriendsProps> = ({ width = '800px', height = '500px' }) => {
  const style = { width, minHeight: height };
  const [friends, setFriends] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [notifications, setNotifications] = useState([]);

  const toggleDetails = (index) => {
    const newExpandedRows = { ...expandedRows, [index]: !expandedRows[index] };
    setExpandedRows(newExpandedRows);
  };

  useEffect(() => {
    getFriends();
      const intervalId = setInterval(() => {
        getFriends();
      }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const getFriends = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Authorization': `${token}`
      };
      const response = await api.get(`/friends/${localStorage.getItem("userId")}`, { headers });
      if (response.data) {
            setFriends(response.data.map(friend => ({
              id: friend.id,
              name: friend.username,
              status: friend.status.toLowerCase() === 'online' ? 'online' : 'offline',
              userEmail: friend.userEmail,
              score: friend.score,
              currentPoints: friend.currentpoints,
              verified: friend.verified,
              featuredInRankings: friend.featured_in_rankings,
            })));
          }
    } catch (error) {
      handleError(error);
    }
  };

  async function handleDelete(username) {
    console.log("Delete button clicked", username);
    if (username === "") {
          return;
    }
    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      };
      const requestBody = JSON.stringify({ username: username });
      console.log(requestBody);

      const response = await api.delete(`/friends/${localStorage.getItem("userId")}`, {
        headers: headers,
        data: requestBody
      });

      if (response.status === 200) {
        console.log("Friend successfully deleted");
      } else {
        console.log("Failed to delete friend");
      }
    } catch (error) {
          handleError(error);
    }
    getFriends();
    addNotification("Friend deleted", "win");
  }

  async function handleInvite(username: string) {
    console.log("Invite button clicked", username);
    addNotification("Invitation sent", "default");
  }

  const addNotification = (text, type) => {
    setNotifications(prevNotifications => [
      ...prevNotifications,
      { id: Date.now(), text, type }
    ]);
  }

  const removeNotification = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  }

  return (
    <div className="base-element-friends" style={style}>
      <NotificationSquare
        notifications={notifications}
        removeNotification={removeNotification}
      />
      {friends.map((friend, index) => (
        <div key={index} className={`player-row ${index % 2 === 0 ? 'light-stripe' : 'dark-stripe'} ${expandedRows[index] ? 'expanded' : ''}`}>
          <div className="visible-details">
            <button onClick={() => toggleDetails(index)} className="toggle-details">
              {expandedRows[index] ? '▶' : '▼'}
            </button>
            <div className="player-name">{friend.name}</div>
            {/*{expandedRows[index] && (
              <>
                <div className="player-globe">GlobeGuesser: {friend.GlobeGuesser}</div>
                <div className="player-flag">FlagFinder: {friend.FlagFinder}</div>
                <div className="player-geo">GeoGenius: {friend.GeoGenius}</div>
              </>
            )}*/}
            <div className={`player-status ${friend.status === 'online' ? 'online' : 'offline'}`}>
              {friend.status}
            </div>
            {expandedRows[index] && (
              <>
                <button className="invite-button" onClick={() => handleInvite(friend.name)}>Invite</button>
                <button className="delete-button" onClick={() => handleDelete(friend.name)}>Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BaseElementFriends;

