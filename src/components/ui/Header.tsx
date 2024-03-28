import React from "react";
import "../../styles/ui/Header.scss";

interface Header {
  text: string;
}

const Header: React.FC<Header> = ({ text }) => {
  return <p className="header">{text}</p>;
};

export default Header;
