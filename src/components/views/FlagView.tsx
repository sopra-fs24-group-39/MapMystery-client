import React from 'react';
import PropTypes from 'prop-types';

const FlagView = ({ countryCode, onFlagLoad }) => {
  const flagUrl = `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;

  const handleLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    onFlagLoad(naturalWidth, naturalHeight);
  };

  return (
    <img
      src={flagUrl}
      alt={`Flag of ${countryCode}`}
      onLoad={handleLoad}
      onError={(e) => { e.target.src = 'default-flag-path'; }}
    />
  );
};

FlagView.propTypes = {
  countryCode: PropTypes.string.isRequired,
  onFlagLoad: PropTypes.func.isRequired
};

export default FlagView;
