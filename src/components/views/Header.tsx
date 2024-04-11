import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../../styles/views/Header.scss";
import DropDown from "components/views/DropDown";
import Logo from "components/pictures/Logo";
import MinidenticonImg from "components/pictures/ProfilePicture";

const Header = props => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar-container">
      <ul className="nav-list">
        <li className="logo-item" onClick={() => handleNavigation("/")}>
          <Logo width="50px" height="50px" />
        </li>
        <li onClick={() => handleNavigation("/rankings")} className="nav-option">
          Rankings
        </li>
        <li onClick={() => handleNavigation("/friends")} className="nav-option">
          Friends
        </li>
        <li onClick={() => handleNavigation("/settings")} className="nav-option">
          Settings
        </li>
      </ul>
      <div className="nav-icon">
        {/*asking backend team to make two random numbers between 0-100 @ user creation*/}
        <MinidenticonImg username="SoPra" saturation={60} lightness={50} width="45" height="45" />
      </div>
    </nav>
  );
};

Header.propTypes = {
  height: PropTypes.string,
};

export default Header;
