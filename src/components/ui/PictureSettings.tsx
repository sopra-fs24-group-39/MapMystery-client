import React, { useState, useEffect } from "react";
import "../../styles/ui/PictureSettings.scss";
import MinidenticonImg from "components/pictures/ProfilePicture";

interface PictureSettingsProps {
  username: string;
  picturenumber?: number;
}

const PictureSettings: React.FC<PictureSettingsProps> = ({ username = "", picturenumber }) => {
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <h2 className="picture-title">Profile Picture Settings</h2>
      <div className="picture-settings-container">
        <div className="circle">
          <MinidenticonImg
            username={username}
            saturation={saturation}
            lightness={lightness}
            width="45"
            height="45"
            className="minidenticon-img"
          />
        </div>
        { isEditing && <div className="options-settings-container">
          <div
            className={`color-circle red ${selectedColor === 'red' ? 'selected' : ''}`}
            onClick={() => handleColorClick('red')}
          />
          <div
            className={`color-circle green ${selectedColor === 'green' ? 'selected' : ''}`}
            onClick={() => handleColorClick('green')}
          />
          <div
            className={`color-circle blue ${selectedColor === 'blue' ? 'selected' : ''}`}
            onClick={() => handleColorClick('blue')}
          />
        </div>}
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
