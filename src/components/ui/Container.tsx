import React from 'react';
import "../../styles/ui/Container.scss";

type BaseElementProps = {
  children?: React.ReactNode;
};

const BaseElement: React.FC<BaseElementProps> = ({ children }) => {
  return <div className="base-element">{children}</div>;
};

export default BaseElement;
