import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/views/Header.scss";
import DropDown from "components/views/DropDown";
import Logo from "components/pictures/Logo";
import MinidenticonImg from "components/pictures/ProfilePicture";

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://react.dev/learn/your-first-component and https://react.dev/learn/passing-props-to-a-component 
 * @FunctionalComponent
 */
const Header = props => (
<<<<<<< Updated upstream
    <nav className={"navbar-container"}>
        <ul className={"nav-list"}>
            <li><a className={"nav-link"}>Rankings</a></li>
            <li><a className={"nav-link"}>Friends</a></li>
            <li><a className={"nav-link"}>Settings</a></li>
        </ul>
        <h1 className={"nav-icon"}>Icon</h1>
    </nav>
=======
  <nav className="navbar-container">
    <ul className="nav-list">
      <li className="logo-item"><a><Logo width="50px" height="50px"/></a></li>
      <li><a className="nav-option">Rankings</a></li>
      <li><a className="nav-option">Friends</a></li>
      <li><a className="nav-option">Settings</a></li>
    </ul>
    <div className="nav-icon">
      {/*asking backend team to make two random numbers between 0-100 @ user creation*/}
      <MinidenticonImg username="SoPra" saturation={60} lightness={50} width="45" height="45" />
    </div>
  </nav>
>>>>>>> Stashed changes
);

Header.propTypes = {
  height: PropTypes.string,
};

/**
 * Don't forget to export your component!
 */
export default Header;
