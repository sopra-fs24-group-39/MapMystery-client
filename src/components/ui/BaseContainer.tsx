import React from 'react';
import "../../styles/ui/BaseContainer.scss";
import PropTypes from 'prop-types';

const BaseContainer = ({ className, children, backgroundImage }) => {
  return (
    <div
      className={`base-container ${className ?? ''}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
};

BaseContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  backgroundImage: PropTypes.string,
};

export default BaseContainer;
