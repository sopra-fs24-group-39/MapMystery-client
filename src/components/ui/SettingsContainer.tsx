import React, { useState, useEffect } from 'react';
import "../../styles/ui/AccountSettings.scss";
import Button from "components/ui/Button";
import { useNavigate } from 'react-router-dom';
import { api } from "helpers/api";
import NotificationSquare from "components/ui/NotificationSquare";
import AccountSettings from "./AccountSettings";
import GameStatistics from "./GameStatistics";
import RankingSettings from "./RankingSettings";
import FriendSettings from "./FriendSettings";
import PictureSettings from "./PictureSettings";

type BaseElementSettingsProps = {
  width?: string;
  height?: string;
};

const BaseElementSettings: React.FC<BaseElementSettingsProps> = ({ width = '800px', height = '500px' }) => {
  const [selectedContent, setSelectedContent] = useState('default');
  const [isRankingEnabled, setIsRankingEnabled] = useState(false);
  const [isRequestsEnabled, setIsRequestsEnabled] = useState(false);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const containerStyle = { width, minHeight: height };
  const sidebarStyle = { width: '35%', height: height };
  const mainContentStyle = { width: '65%', height: height };
  const sidebarBottomStyle = { width: '100%', height: '17%' };
  const sidebarTopStyle = { width: '100%', height: '83%' };

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const response = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      const {
        username,
        userEmail,
        creationdate,
        currentpoints,
        pointsthismonth,
        featured_in_rankings,
        accept_friendrequests,
        verified
      } = response.data;
      setUserInfo({ username, userEmail, creationdate, verified, currentpoints, pointsthismonth, accept_friendrequests, featured_in_rankings });
      setIsRankingEnabled(featured_in_rankings);
      setIsRequestsEnabled(accept_friendrequests);
    } catch (error) {
      addNotification("Error getting user info", "error");
    }
  };

  const doLogout = async () => {
    const userId = localStorage.getItem("userId");
    const status = "OFFLINE";
    const token = localStorage.getItem("token");
    try {
      const requestBody = JSON.stringify({ status });
      const config = {
        headers: {
          Authorization: `${token}`
        }
      };
      await api.put("/users/" + userId, requestBody, config);
    } catch (e) {
      // handle error
    } finally {
      localStorage.clear();
      navigate('/login');
    }
  };

  const changeContent = (content: string) => {
    setSelectedContent(content);
  };

  const handleToggleRankingChange = (isEnabled: boolean) => {
    setIsRankingEnabled(isEnabled);
  };

  const handleToggleRequestsChange = (isEnabled2: boolean) => {
    setIsRequestsEnabled(isEnabled2);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'Account Settings':
        return <AccountSettings userInfo={userInfo} onSave={handleSave} />;
      case 'Game Statistics':
        return <GameStatistics currentpoints={userInfo.currentpoints} pointsthismonth={userInfo.pointsthismonth} />;
      case 'Ranking Settings':
        return <RankingSettings onToggleChange={handleToggleRankingChange} isToggled={isRankingEnabled} />;
      case 'Friend Settings':
        return <FriendSettings onToggleChange={handleToggleRequestsChange} isToggled={isRequestsEnabled} />;
      case 'Picture Settings':
        return <PictureSettings username={userInfo.username} picturenumber={localStorage.getItem("profilepicture")} />;
      default:
        return <AccountSettings userInfo={userInfo} onSave={handleSave} />;
    }
  };

  const handleSave = (updatedInfo) => {
    setUserInfo({ ...userInfo, ...updatedInfo });
  };

  const addNotification = (text, type) => {
    setNotifications(prevNotifications => [
      ...prevNotifications,
      { id: Date.now(), text, type }
    ]);
  };

  const removeNotification = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  return (
    <div className="base-element-settings" style={containerStyle}>
      <NotificationSquare
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <div className="sidebar" style={sidebarStyle}>
        <div className="sidebar-top striped-background" style={sidebarTopStyle}>
          <div className="settings-chapter" onClick={() => changeContent('Account Settings')}>Account Settings</div>
          <div className="settings-chapter" onClick={() => changeContent('Game Statistics')}>Game Statistics</div>
          <div className="settings-chapter" onClick={() => changeContent('Ranking Settings')}>Ranking Settings</div>
          <div className="settings-chapter" onClick={() => changeContent('Friend Settings')}>Friend Settings</div>
          <div className="settings-chapter" onClick={() => changeContent('Picture Settings')}>Picture Settings</div>
        </div>
        <div className="sidebar-bottom" style={sidebarBottomStyle}>
          <Button type={"login"} width={"md"} name={"Log out"} onClick={doLogout} />
        </div>
      </div>
      <div className="main-content" style={mainContentStyle}>
        {renderContent()}
      </div>
    </div>
  );
};

export default BaseElementSettings;
