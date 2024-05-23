import React, { useState } from 'react';
import "../../styles/ui/RankingSettings.scss";
import NotificationSquare from "components/ui/NotificationSquare";
import { api, handleError } from "helpers/api";

type RankingSettingsProps = {
  onToggleChange: (isEnabled: boolean) => void;
  isToggled: boolean;
};

const RankingSettings: React.FC<RankingSettingsProps> = ({ onToggleChange, isToggled }) => {
  const [notifications, setNotifications] = useState([]);

  const handleToggle = async () => {
    onToggleChange(!isToggled);

    console.log(isToggled);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      await api.put(`/settings/${userId}`,
        { featured_in_rankings: isToggled },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      addNotification("Friend request settings updated", "win");
    } catch (error) {
      addNotification("Error updating friend request settings", "error");
      handleError(error);
    }
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
    <div className="ranking-settings">
      <NotificationSquare
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <h2 className="ranking-settings-title" >Ranking Settings</h2>
      <div className="toggle-container">
        <span>Enable Ranking</span>
        <div className="toggle-switch" onClick={handleToggle}>
          <input type="checkbox" checked={isToggled} readOnly />
          <span className="slider round"></span>
        </div>
        <span>Disable Ranking</span>
      </div>
    </div>
  );
};

export default RankingSettings;
