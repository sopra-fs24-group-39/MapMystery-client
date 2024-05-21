import React from 'react';
import "../../styles/ui/FriendSettings.scss";

type FriendSettingsProps = {
  onToggleChange: (isEnabled: boolean) => void;
  isToggled: boolean;
};

const FriendSettings: React.FC<FriendSettingsProps> = ({ onToggleChange, isToggled }) => {
  const handleToggle = () => {
    onToggleChange(!isToggled);
  };

  return (
    <div className="friend-settings">
      <h2 className="friend-settings-title" >Friend Settings</h2>
      <div className="toggle-container">
        <span>Enable friend requests</span>
        <div className="toggle-switch" onClick={handleToggle}>
          <input type="checkbox" checked={isToggled} readOnly />
          <span className="slider round"></span>
        </div>
        <span>Disable friend requests</span>
      </div>
    </div>
  );
};

export default FriendSettings;
