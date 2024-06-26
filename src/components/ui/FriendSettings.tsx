import React, { useState, useEffect } from 'react';
import "../../styles/ui/FriendSettings.scss";
import NotificationSquare from "components/ui/NotificationSquare";
import { api, handleError } from "helpers/api";

type FriendSettingsProps = {
  onToggleChange: (isEnabled: boolean) => void;
  isToggled: boolean;
};

const FriendSettings: React.FC<FriendSettingsProps> = ({ onToggleChange, isToggled }) => {
  const [toggleState, setToggleState] = useState(isToggled);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setToggleState(isToggled);
  }, [isToggled]);

  const handleToggle = async () => {
    const newToggleState = !toggleState;
    setToggleState(newToggleState);
    onToggleChange(newToggleState);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      await api.put(`/settings/${userId}`,
        { accept_friendrequests: newToggleState },
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

  const addNotification = (text: string, type: string) => {
    setNotifications(prevNotifications => [
      ...prevNotifications,
      { id: Date.now(), text, type }
    ]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  return (
    <div className="friend-settings">
      <NotificationSquare
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <h2 className="friend-settings-title">Friend Settings</h2>
      <div className="toggle-container-friends">
        <span>Enable friend requests</span>
        <div className="toggle-switch-friends" onClick={handleToggle}>
          <input type="checkbox" checked={!toggleState} readOnly />
          <span className="slider round"></span>
        </div>
        <span>Disable friend requests</span>
      </div>
    </div>
  );
};

export default FriendSettings;
