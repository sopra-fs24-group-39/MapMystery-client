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
  const [notifications, setNotifications] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState({
    username: userInfo.username,
    userEmail: userInfo.userEmail,
    password: '',
    confirmPassword: ''
  });
  const [editedUserInfo, setEditedUserInfo] = useState({
    username: userInfo.username,
    userEmail: userInfo.userEmail,
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setCurrentUserInfo({
      username: userInfo.username,
      userEmail: userInfo.userEmail,
      password: '',
      confirmPassword: ''
    });
    setEditedUserInfo({
      username: userInfo.username,
      userEmail: userInfo.userEmail,
      password: '',
      confirmPassword: ''
    });
  }, [userInfo]);

const handleSave = async () => {
  if (editedUserInfo.password !== editedUserInfo.confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const settingsToUpdate = [
    { key: 'username', value: editedUserInfo.username },
    { key: 'userEmail', value: editedUserInfo.userEmail }
  ];

  if (editedUserInfo.password !== '') {
    settingsToUpdate.push({ key: 'password', value: editedUserInfo.password });
  }

  try {
    for (const setting of settingsToUpdate) {
      if (setting.value !== currentUserInfo[setting.key]) {

        const response = await api.put(`/settings/${userId}`,
          { [setting.key]: setting.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newToken = response.data.token;
        if (newToken) {
          localStorage.setItem("token", newToken);
        }
        if (setting.key === 'username') {
          localStorage.setItem("username", setting.value);
        }
      }
    }

    setCurrentUserInfo(editedUserInfo);
    setIsEditing(false);
    setError('');
    addNotification("Settings updated", "win");
    onSave(editedUserInfo);
  } catch (error) {
    handleError(error);
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      if (errorMessage.includes('email')) {
        addNotification('The email address is already used', 'error');
      } else if (errorMessage.includes('username')) {
        addNotification('The username is not available', 'error');
      } else {
        addNotification("Username or email already in use", "error");
      }
    } else {
      addNotification("Error updating settings", "error");
    }
  }
};

const handleCancel = () => {
  setEditedUserInfo({
    username: currentUserInfo.username,
    userEmail: currentUserInfo.userEmail,
    password: '',
    confirmPassword: ''
  });
  setIsEditing(false);
  setError('');
};


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUserInfo({ ...editedUserInfo, password: e.target.value });
    if (e.target.value !== editedUserInfo.confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUserInfo({ ...editedUserInfo, confirmPassword: e.target.value });
    if (e.target.value !== editedUserInfo.password) {
      setError('Passwords do not match');
    } else {
      setError('');
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
    <div className="account-settings">
      <NotificationSquare
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <h2 className="account-title">Account Settings</h2>
      <div className="settings-item">
        <label>Username:</label>
        <input
          type="text"
          value={editedUserInfo.username}
          disabled={!isEditing}
          onChange={(e) => setEditedUserInfo({ ...editedUserInfo, username: e.target.value })}
          maxLength={50}
        />
      </div>
      <div className="settings-item">
        <label>Email:</label>
        <input
          type="email"
          value={editedUserInfo.userEmail}
          disabled={!isEditing}
          onChange={(e) => setEditedUserInfo({ ...editedUserInfo, userEmail: e.target.value })}
          maxLength={50}
        />
      </div>
      <div className="settings-item">
        <label>Password:</label>
        <input
          type="password"
          value={isEditing ? editedUserInfo.password : "thisisapassword"}
          readOnly={!isEditing}
          disabled={!isEditing}
          onChange={handlePasswordChange}
          maxLength={50}
        />
      </div>
      {isEditing && (
        <div className="settings-item">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={editedUserInfo.confirmPassword}
            onChange={handleConfirmPasswordChange}
            maxLength={50}
          />
        </div>
      )}
      <div className="settings-item">
        <label>Verified:</label>
        <span>{userInfo.verified ? 'Yes' : 'No'}</span>
      </div>
      <div className="settings-item">
        <label>Account creation date:</label>
        <span>{userInfo.creationdate}</span>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="settings-item h-full justify-end">
        {isEditing ? (
          <div className="account-button-container">
            <div className="save-button-accountsettings" onClick={handleSave}>
              Save
            </div>
            <div className="cancel-button-accountsettings" onClick={handleCancel}>
              Cancel
            </div>
          </div>
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
