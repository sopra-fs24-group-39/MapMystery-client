import React from "react";
import "../../styles/ui/Title.scss";

interface Header {
  text: string;
  size: string;
}

/*
 * Sizes:
 * @lg - font size 10em
 * @md - fonz size 7em
 */
const Header: React.FC<Header> = ({ size="lg", text }) => {
  return <p className={"title "+size+"-title"}>{text}</p>;
};

export default Header;
