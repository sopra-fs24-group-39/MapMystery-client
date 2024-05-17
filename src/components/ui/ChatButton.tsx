import React, { useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as DefaultIcon } from "./sources/info.svg";
import { ReactComponent as AddIcon } from "./sources/add.svg";
import { ReactComponent as BackIcon } from "./sources/back.svg";
import { ReactComponent as ChatIcon } from "./sources/chat.svg";
import "../../styles/ui/ChatButton.scss";
import ChatBox from "./ChatBox";

const iconMapping = {
  default: DefaultIcon,
  AddIcon: AddIcon,
  BackIcon: BackIcon,
  Chat: ChatIcon,
};

interface ChatButtonProps {
  width: string;
  onClick: () => void;
  icon: string;
  notificationCount: number;
}

const ChatButton: React.FC<ChatButtonProps> = ({ width, onClick, icon, notificationCount }) => {
  const Icon = iconMapping[icon] || DefaultIcon;
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const positionClass = 'bottom-left';

  return (
    <div className={`chat-btton-container ${width}-btton ${positionClass}`}>

      <button className="chat-btton" onClick={handleButtonClick}>
        <Icon className="chat-icon" />
        {notificationCount >= 0 && (
          <span className="notification-circle">{notificationCount}</span>
        )}
      </button>
      {isChatOpen && <ChatBox className={isChatOpen ? 'open' : ''} onClose={handleCloseChat} />}
    </div>
  );
};

ChatButton.propTypes = {
  width: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  notificationCount: PropTypes.number,
};

export default ChatButton;
