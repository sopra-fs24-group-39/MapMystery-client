import React from "react";
import "../../styles/ui/Title.scss";

interface Header {
  text: string;
}

const Header: React.FC<Header> = ({ text }) => {
  return <p className="title">{text}</p>;
};

export default Header;
