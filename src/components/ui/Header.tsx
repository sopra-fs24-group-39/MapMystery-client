import React from "react";
import "../../styles/ui/Header.scss";

interface Header {
  text: string;
}

const Header: React.FC<Header> = ({ text }) => {
  return <h1 className="header">{text}</h1>;
};

export default Header;
