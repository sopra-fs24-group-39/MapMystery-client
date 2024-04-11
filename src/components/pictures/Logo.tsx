import React from "react";
import logoSrc from "../pictures/sources/logo.png"

interface LogoProps {
  width?: string;
  height?: string;
}

const Logo: React.FC<LogoProps> = ({ width = "100px", height = "100px" }) => {
  return <img src={logoSrc} alt="Logo" style={{ width, height }} />;
};

export default Logo;

