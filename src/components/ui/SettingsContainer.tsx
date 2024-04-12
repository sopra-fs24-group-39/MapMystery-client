import React, { useState } from 'react';
import "../../styles/ui/SettingsContainer.scss";
import Button from "components/ui/Button";

type BaseElementSettingsProps = {
  width?: string;
  height?: string;
};

const BaseElementSettings: React.FC<BaseElementSettingsProps> = ({ width = '800px', height = '500px' }) => {
  const [selectedContent, setSelectedContent] = useState('default');

  const containerStyle = { width, minHeight: height };
  const sidebarStyle = { width: '35%', height: height };
  const mainContentStyle = { width: '65%', height: height };
  const sidebarBottomStyle = { width: '100%', height: '17%' };
  const sidebarTopStyle = { width: '100%', height: '83%' };

  const changeContent = (content: string) => {
    setSelectedContent(content);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'Account Settings':
        return <div>Content for Account Settings</div>;
      case 'Personal Information':
        return <div>Content for Personal Information</div>;
      case 'Ranking Settings':
        return <div>Content for Ranking Settings</div>;
      case 'Friend Settings':
        return <div>Content for Friend Settings</div>;
      case 'Profile Picture Settings':
        return <div>Content for Picture Settings</div>;
      case 'Chat Settings':
        return <div>Content for Chat Settings</div>;
      default:
        return <div>Content for Account Settings</div>;
    }
  };

  return (
    <div className="base-element-settings" style={containerStyle}>
      <div className="sidebar" style={sidebarStyle}>
        <div className="sidebar-top striped-background" style={sidebarTopStyle}>
          {/* Add onClick handlers here */}
          <div className="settings-chapter" onClick={() => changeContent('Account Settings')}>Account Settings</div>
          <div className="settings-chapter" onClick={() => changeContent('Personal Information')}>Personal Information</div>
          <div className="settings-chapter" onClick={() => changeContent('Ranking Settings')}>Ranking Settings</div>
          <div className="settings-chapter" onClick={() => changeContent('Friend Settings')}>Friend Settings</div>
          <div className="settings-chapter" onClick={() => changeContent('Picture Settings')}>Picture Settings</div>
          <div className="settings-chapter" onClick={() => changeContent('Chat Settings')}>Chat Settings</div>
        </div>
        <div className="sidebar-bottom" style={sidebarBottomStyle}>
          <Button type={"login"} width={"md"} name={"Log out"} />
        </div>
      </div>
      <div className="main-content" style={mainContentStyle}>
        {renderContent()}
      </div>
    </div>
  );
};

export default BaseElementSettings;
