import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as DefaultIcon } from "./sources/info.svg";
import { ReactComponent as AddIcon } from "./sources/add.svg";
import { ReactComponent as BackIcon } from "./sources/back.svg";
import "../../styles/ui/NotificationIcon.scss";

const iconMapping = {
  default: DefaultIcon,
  AddIcon: AddIcon,
  BackIcon: BackIcon,
};

const RoundButton = ({ width, onClick, icon, notificationCount }) => {
  const Icon = iconMapping[icon] || DefaultIcon;

  return (
    <div className={"round-btton-container " + width + "-btton"}>
      <button className="round-btton" onClick={onClick}>
        <Icon className="btton-icon" />
        {notificationCount >= 0 && (
          <span className="notification-circle">{notificationCount}</span>
        )}
      </button>
    </div>
  );
};

RoundButton.propTypes = {
  width: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  notificationCount: PropTypes.number,
};

export default RoundButton;
