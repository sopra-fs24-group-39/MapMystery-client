import React from "react";
import "../../styles/ui/Header.scss";
import Logo from "source/logo.png"

interface LogoProps {
  width?: string;
  height?: string;
}

const Logo: React.FC<LogoProps> = ({ width = '100px', height = 'auto' }) => {
  return <img src={logoSrc} alt="Logo" style={{ width, height }} />;
};

export default Logo;

