import React, { useState, useEffect } from "react";
import "../../styles/ui/PictureSettings.scss";
import MinidenticonImg from "components/pictures/ProfilePicture";
import profilepicture1 from "./sources/profilepicture1.webp";
import profilepicture2 from "./sources/profilepicture2.webp";
import profilepicture3 from "./sources/profilepicture3.webp";
import { api, handleError } from "helpers/api";
import NotificationSquare from "components/ui/NotificationSquare";

interface PictureSettingsProps {
  username: string;
  picturenumber?: number | string | null;
}

const PictureSettings: React.FC<PictureSettingsProps> = ({ username = "", picturenumber }) => {
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState<number | string | null>(picturenumber);
  const [notifications, setNotifications] = useState([]);

  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; str.length && i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash;
  };

  const updateColorSettings = (username: string) => {
    if (username) {
      const hash = hashString(username);
      const newSaturation = Math.abs(hash % 100);
      const newLightness = Math.abs(hash % 100);
      setSaturation(newSaturation);
      setLightness(newLightness);
    }
  };

  useEffect(() => {
    updateColorSettings(username);
  }, [username]);

  const handleSave = async () => {
    if (selectedPicture !== null) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      try {
        await api.put(`/settings/${userId}`,
          { profilepicture: selectedPicture.toString() },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        addNotification("Profile picture updated", "win");
      } catch (error) {
        addNotification("Error updating profile picture", "error");
        handleError(error);
      }
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedPicture(picturenumber);
    setIsEditing(false);
  };

  const handlePictureClick = (pictureNumber: number) => {
    setSelectedPicture(pictureNumber.toString());
  };

  const getProfilePicture = (picturenumber: string) => {
    switch (picturenumber) {
      case "1":
        return profilepicture1;
      case "2":
        return profilepicture2;
      case "3":
        return profilepicture3;
      default:
        return null;
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
    <div>
      <NotificationSquare
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <h2 className="picture-title">Profile Picture Settings</h2>
      <div className="picture-settings-container">
        <div className="circle">
          {selectedPicture === null || selectedPicture === "null" ? (
            <MinidenticonImg
              username={username}
              saturation={saturation}
              lightness={lightness}
              width="45"
              height="45"
              className="minidenticon-img"
            />
          ) : (
            <div
              className="selected-profile-picture"
              style={{ backgroundImage: `url(${getProfilePicture(selectedPicture)})` }}
            />
          )}
        </div>
        {isEditing && (
          <div className="options-settings-container">
            <div
              className={`photo-container ${selectedPicture === "1" ? 'selected' : ''}`}
              onClick={() => handlePictureClick(1)}
            >
              <div
                className="photo-circle"
                style={{ backgroundImage: `url(${profilepicture1})` }}
              />
            </div>
            <div
              className={`photo-container ${selectedPicture === "2" ? 'selected' : ''}`}
              onClick={() => handlePictureClick(2)}
            >
              <div
                className="photo-circle"
                style={{ backgroundImage: `url(${profilepicture2})` }}
              />
            </div>
            <div
              className={`photo-container ${selectedPicture === "3" ? 'selected' : ''}`}
              onClick={() => handlePictureClick(3)}
            >
              <div
                className="photo-circle"
                style={{ backgroundImage: `url(${profilepicture3})` }}
              />
            </div>
          </div>
        )}
        {!isEditing && (
          <div className="edit-button-picture" onClick={() => setIsEditing(true)}>
            Edit
          </div>
        )}
        {isEditing && (
          <div className="account-button-container">
            <div className="save-button-picture" onClick={handleSave}>
              Save
            </div>
            <div className="cancel-button-picture" onClick={handleCancel}>
              Cancel
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PictureSettings;
