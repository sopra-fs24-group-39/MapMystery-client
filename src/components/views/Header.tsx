import { React, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../../styles/views/Header.scss";
import DropDown from "components/views/DropDown";
import Logo from "components/pictures/Logo";
import MinidenticonImg from "components/pictures/ProfilePicture";
import NavDropDown from "../ui/NavDropDown";

const Header = props => {
  const [navDropDown, setNavDropDown] = useState("hidden");

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  function expandAvatar() {
    if (navDropDown === "hidden") {
      setNavDropDown("");
    } else {
      setNavDropDown("hidden")
    }
  }

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
          <li className="menu-link nav-option" onClick={() => handleNavigation("/globeguesser")}>
            GameView
          </li>
          <li className="menu-link nav-option" onClick={() => handleNavigation("/mapview")}>
            mapview
          </li>
        </ul>
        <div className="nav-icon" onClick={expandAvatar}>
          <MinidenticonImg username="SoPra" saturation={60} lightness={50} width="45" height="45" />
        </div>
      </nav>
      <div className={navDropDown+ " w-screen absolute flex flex-row justify-end"} onClick={expandAvatar}>
        <NavDropDown></NavDropDown>
      </div>
    </div>
  );
};

Header.propTypes = {
  height: PropTypes.string,
};

export default Header;
