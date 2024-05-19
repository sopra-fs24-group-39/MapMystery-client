import { React, useState, useEffect } from "react";
import Button from "components/ui/Button";
import Header from "components/views/Header";
import Logo from "components/pictures/Logo";
import "styles/views/FinalScore.scss";
import BaseContainer from "components/ui/BaseContainer";
import BackgroundImage from "./sources/background.png";
import Podium from "components/ui/Podium";
import { useBeforeUnload } from "helpers/useBeforeUnload";
import { api, handleError } from "helpers/api";
import { useNavigate } from 'react-router-dom';
import { webSocketService } from './WebSocketService';
import RoundButton from "components/ui/NotificationIcon";
import NotificationSquare from "components/ui/NotificationSquare";


const FinalScore = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const getLeaderboard = () => {
    const data = localStorage.getItem('leaderboard');
    if (data) {
      const parsedData = JSON.parse(data);
      return Object.keys(parsedData).map(name => ({
        name,
        points: parsedData[name]
      }));
    } else {
      addNotification('Leaderboard is empty', 'error');
    }
    return [];
  };

  useEffect(() => {
    const data = getLeaderboard();
    const sortedLeaderboard = data.sort((a, b) => b.points - a.points);
    setLeaderboard(sortedLeaderboard);
  }, []);

  //useEffect for leaving the lobby
  useEffect(() => {
    const timer = setTimeout(() => {
      leaveLobby();
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const first = leaderboard[0] || { name: 'Player 1', points: 0 };
  const second = leaderboard[1] || { name: '', points: 0 };
  const third = leaderboard[2] || { name: '', points: 0 };

  ///////////////////////////////////////////// LEAVING LOBBY /////////////////////////////////////////////
  async function leaveLobby() {
    console.log("Leaving lobby");
    try {
      webSocketService.disconnect();
      //gettging the things needed to leave lobby
      const userId = localStorage.getItem("userId");
      const lobbyId = localStorage.getItem("lobby");
      const token = localStorage.getItem("token");
      localStorage.removeItem("round");
      localStorage.removeItem("lobby");
      localStorage.removeItem("leaderboard")
      localStorage.removeItem("gamemode")
      localStorage.removeItem("authKey");
      localStorage.removeItem("Singleplayer");
      localStorage.removeItem("roundies");

      //making the call to leave the lobby
      const headers = {
        'Authorization': `${token}`
      };

      await api.delete(`/Lobby/GameMode1/${lobbyId}/${userId}`, { headers });
    } catch (error) {
      console.error(`Failed to leave lobby: ${handleError(error)}`);
    } finally {
      localStorage.removeItem("round");
      localStorage.removeItem("lobby");
      localStorage.removeItem("leaderboard")
      localStorage.removeItem("gamemode")
      localStorage.removeItem("authKey");
      localStorage.removeItem("Singleplayer");
      localStorage.removeItem("roundies");
      navigate('/');
    }
  }

  useBeforeUnload("Leaving this page will reset the game", () => {
    console.log("User is leaving the page or closing tab.");
    leaveLobby();

  });

  const handleCustomNavigate = async (url) => {
    console.log("URL", url);
    try {
      await leaveLobby();
      navigate(url);
    } catch (error) {
      console.error("Error during navigation preparation: ", error);
      navigate("/game")
    }
  };

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
    <BaseContainer backgroundImage={BackgroundImage} className="main-body">
      <div className="center-container">
        <Header onNavigateClick={handleCustomNavigate} />
        <div className="podium-container">
        {/*
          <RoundButton
            className="back-button-podium"
            width="md"
            onClick={leaveLobby}
            icon="BackIcon"
          />
        */}
          <Podium first={first} second={second} third={third} />
        </div>
      </div>
    </BaseContainer>
  );
};

export default FinalScore;
