import React from 'react';
import "../../styles/ui/Container.scss";

type BaseElementProps = {
  children?: React.ReactNode;
  width?: string;
  height?: string;
};

const BaseElement: React.FC<BaseElementProps> = ({ children, width = '800px', height = '500px' }) => {
  const style = { width, minHeight: height };
  return <div className="base-element" style={style}>{children}</div>;
};

export default BaseElement;
