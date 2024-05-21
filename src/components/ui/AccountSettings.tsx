import React, { useState, useEffect } from 'react';
import "../../styles/ui/SettingsContainer.scss";
import { useNavigate } from 'react-router-dom';
import { api, handleError } from "helpers/api";
import NotificationSquare from "components/ui/NotificationSquare";

type AccountSettingsProps = {
  userInfo: any;
  onSave: (updatedInfo: any) => void;
};

const AccountSettings: React.FC<AccountSettingsProps> = ({ userInfo, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState({ username: userInfo.username, userEmail: userInfo.userEmail });
  const [editedUserInfo, setEditedUserInfo] = useState({ username: userInfo.username, userEmail: userInfo.userEmail });

  useEffect(() => {
    // Initialize states with the userInfo prop
    setCurrentUserInfo({ username: userInfo.username, userEmail: userInfo.userEmail });
    setEditedUserInfo({ username: userInfo.username, userEmail: userInfo.userEmail });
  }, [userInfo]);

  const handleSave = () => {
    setCurrentUserInfo(editedUserInfo);
    onSave(editedUserInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUserInfo({ username: currentUserInfo.username, userEmail: currentUserInfo.userEmail });
    setIsEditing(false);
  };

  return (
    <div className="account-settings">
      <h2 className="account-title">Account Settings</h2>
      <div className="settings-item">
        <label>Username:</label>
        <input
          type="text"
          value={editedUserInfo.username}
          disabled={!isEditing}
          onChange={(e) => setEditedUserInfo({ ...editedUserInfo, username: e.target.value })}
        />
      </div>
      <div className="settings-item">
        <label>Email:</label>
        <input
          type="email"
          value={editedUserInfo.userEmail}
          disabled={!isEditing}
          onChange={(e) => setEditedUserInfo({ ...editedUserInfo, userEmail: e.target.value })}
        />
      </div>
      <div className="settings-item">
        <label>Password:</label>
        <input
          type={isEditing ? "text" : "password"}
          value={"thisisapassword"}
          disabled={!isEditing}
          onChange={(e) => setEditedUserInfo({ ...editedUserInfo, username: e.target.value })}
        />
      </div>
      {isEditing ? (
        <div className="settings-item">
          <label>Password:</label>
          <input
            type="text"
            value={"thisisapassword"}
            disabled={!isEditing}
            onChange={(e) => setEditedUserInfo({ ...editedUserInfo, username: e.target.value })}
          />
        </div>
      ) : null}
      <div className="settings-item">
        <label>Verified:</label>
        <span>{userInfo.verified ? 'Yes' : 'No'}</span>
      </div>
      <div className="settings-item">
        <label>Account creation date:</label>
        <span>{userInfo.creationdate}</span>
      </div>
      <div className="settings-item">
        {isEditing ? (
          <>
            <div className="account-button-container">
              <div className="save-button-accountsettings" onClick={handleSave}>
                Save
              </div>
              <div className="cancel-button-accountsettings" onClick={handleCancel}>
                Cancel
              </div>
            </div>
          </>
        ) : (
          <div className="edit-button-accountsettings" onClick={() => setIsEditing(true)}>
            Edit
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
