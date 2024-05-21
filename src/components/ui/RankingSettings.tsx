import React from 'react';
import "../../styles/ui/RankingSettings.scss";

type RankingSettingsProps = {
  onToggleChange: (isEnabled: boolean) => void;
  isToggled: boolean;
};

const RankingSettings: React.FC<RankingSettingsProps> = ({ onToggleChange, isToggled }) => {
  const handleToggle = () => {
    onToggleChange(!isToggled);
  };

  return (
    <div className="ranking-settings">
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
