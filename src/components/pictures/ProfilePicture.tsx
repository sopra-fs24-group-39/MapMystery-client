import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { minidenticon } from "minidenticons";

const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  );
  return (<img src={svgURI} alt={username} {...props} />);
}

MinidenticonImg.propTypes = {
  username: PropTypes.string.isRequired,
  saturation: PropTypes.number, // Assuming saturation is a number
  lightness: PropTypes.number, // Assuming lightness is a number
};

export default MinidenticonImg;
