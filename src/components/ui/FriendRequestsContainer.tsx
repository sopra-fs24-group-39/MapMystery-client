import React, { useState, useEffect } from 'react';
import "../../styles/ui/FriendRequestsContainer.scss";
import { api, handleError } from "helpers/api";

interface BaseElementFriendsProps {
  width?: string;
  height?: string;
}

const BaseElementFriends: React.FC<BaseElementFriendsProps> = ({ width = '800px', height = '500px' }) => {
  const [friends, setFriends] = useState([]);
  const style = { width, minHeight: height };

  useEffect(() => {
    getFriendRequests();
    const intervalId = setInterval(() => {
      getFriendRequests();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  async function getFriendRequests() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Authorization': ` ${token}`
      };
      const response = await api.get(`/friends/friendrequests/${localStorage.getItem("userId")}`, { headers });
      if (response.data && response.data.friendrequests) {
        setFriends(response.data.friendrequests.map(request => ({ name: request })));
      }
      console.log(response);
    } catch (error) {
      handleError(error);
    }
  }

  async function onAccept(username: string) {
    if (username === "") {
          return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      };
      const requestBody = JSON.stringify({ username, accepted: true });
      const response = await api.put(`/friends/friendrequests/${localStorage.getItem("userId")}`, requestBody, { headers });
      console.log(response);
    }catch (error) {
      handleError(error);
    }
    getFriendRequests();
  }

  async function onDecline(username: string) {
    if (username === "") {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      };
      const requestBody = JSON.stringify({ username, accepted: false });
      const response = await api.put(`/friends/friendrequests/${localStorage.getItem("userId")}`, requestBody, { headers });
    }catch (error) {
      handleError(error);
    }
    getFriendRequests();
  }

  return (
    <div className="base-element-friends-req" style={style}>
      {friends.map((friend, index) => (
        <div key={index} className={`player-row ${index % 2 === 0 ? 'light-stripe' : 'dark-stripe'}`}>
          <div className="visible-details">
            <div className="player-name">{friend.name}</div>
            <div className="player-buttons">
              <div className="accept-button" onClick={() => onAccept(friend.name)}> Accept </div>
              <div className="decline-button" onClick={() => onDecline(friend.name)}> Decline </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BaseElementFriends;
