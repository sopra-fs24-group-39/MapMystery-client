import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../../styles/views/Header.scss";
import Logo from "components/pictures/Logo";
import MinidenticonImg from "components/pictures/ProfilePicture";
import NavDropDown from "../ui/NavDropDown";
import profilepicture1 from "components/ui/sources/profilepicture1.webp";
import profilepicture2 from "components/ui/sources/profilepicture2.webp";
import profilepicture3 from "components/ui/sources/profilepicture3.webp";
import { api, handleError } from "helpers/api";


const Header = ({ onNavigateClick }) => {
  const [navDropDown, setNavDropDown] = useState("hidden");
  const [username, setUsername] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkForUsername = () => {
      const storedUsername = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      const storedProfilePicture = localStorage.getItem("profilepicture");

      if (storedUsername) {
        setUsername(storedUsername);
        updateColorSettings(storedUsername);
      }
      setHasToken(token !== null);
      setProfilePicture(storedProfilePicture);
    };

    window.addEventListener("storage", checkForUsername);
    checkForUsername();

    return () => {
      window.removeEventListener("storage", checkForUsername);
    };
  }, []);

  const handleNavigation = (path) => {
    if (onNavigateClick) {
      onNavigateClick(path);
    } else {
      navigate(path);
    }
  };

  function expandAvatar() {
    setNavDropDown(prevState => prevState === "hidden" ? "" : "hidden");
  }

  const hashString = str => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash;
  };

  const updateColorSettings = username => {
    const hash = hashString(username);
    const newSaturation = Math.abs(hash % 100);
    const newLightness = Math.abs(hash % 100);
    setSaturation(newSaturation);
    setLightness(newLightness);
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const response = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const profilePictureNumber = response.data.profilepicture;
      setProfilePicture(profilePictureNumber);
      localStorage.setItem("profilepicture", profilePictureNumber);
    } catch (error) {
      console.log("Logging user out due to old token");
      logout();
    }
  };

  const logout = async () => {
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
      const response = await api.put("/users/" + userId, requestBody, config);
    } catch (e) {

    } finally {
      localStorage.clear();
      navigate("/login");
    }
  }

  const renderProfilePicture = () => {
    switch(profilePicture) {
      case "1" || 1:
        return <img src={profilepicture1} alt="Profile" width="45" height="45" />;
      case "2" || 2:
        return <img src={profilepicture2} alt="Profile" width="45" height="45" />;
      case "3" || 3:
        return <img src={profilepicture3} alt="Profile" width="45" height="45" />;
      default:
        return <MinidenticonImg username={username} saturation={saturation} lightness={lightness} width="45" height="45" />;
    }
  };

  return (
    <div className={"h-12"}>
      <nav className="navbar-container">
        <ul className="nav-list">
          <li className="logo-item menu-link" onClick={() => handleNavigation("/")}>
            <Logo width="50px" height="50px"/>
          </li>
          <li className="menu-link nav-option" onClick={() => handleNavigation("/rankings")}>
            Rankings
          </li>
          <li className="menu-link nav-option" onClick={() => handleNavigation("/friends")}>
            Friends
          </li>
          <li className="menu-link nav-option" onClick={() => handleNavigation("/settings")}>
            Settings
          </li>
        </ul>
        <div className="nav-icon" onClick={expandAvatar}>
          {renderProfilePicture()}
        </div>
      </nav>
      {hasToken && <div className={navDropDown + " w-screen absolute flex flex-row justify-end"} onClick={expandAvatar}>
        <NavDropDown></NavDropDown>
      </div>}
    </div>
  );
};

Header.propTypes = {
  height: PropTypes.string,
  onNavigateClick: PropTypes.func
};

export default Header;
