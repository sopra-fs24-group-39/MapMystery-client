import React, { useState, useEffect } from "react";
import { api, handleError } from "../../helpers/api";
import "../../styles/ui/CurrentlyOnline.scss";

const CurrentlyOnline = () => {
  const [players, setPlayers] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const getOnlineUsers = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    const headers = {
      'Authorization': `${token}`
    };
    try {
      const response = await api.get("/active-users", {
        headers: headers,
        params: { userId: id } // Pass the id as a query parameter
      });
      setPlayers(response.data.Users);
    } catch (e) {
      console.error(handleError(e));
      setPlayers([]);
    }
  };

  useEffect(() => {
    getOnlineUsers();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="online-players-container">
      <div className="online-players-box">
        <button onClick={toggleDropdown} className="online-players-button">
          {players.length} players <span className="player-status online">Online</span>
        </button>
        {isDropdownVisible && players.length > 0 && (
          <div className="dropdown-online">
            {players.map((player, index) => (
              <div key={index} className="player-box">
                {player}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentlyOnline;