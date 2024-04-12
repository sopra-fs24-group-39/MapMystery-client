import React from "react";
import "../../styles/ui/Title.scss";

interface Header {
  text: string;
  size: string;
}

const Header: React.FC<Header> = ({ size="lg", text }) => {
  return <p className={"title "+size+"-title"}>{text}</p>;
};

export default Header;
