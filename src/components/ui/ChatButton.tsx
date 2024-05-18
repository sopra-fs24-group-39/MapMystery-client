import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ReactComponent as DefaultIcon } from "./sources/info.svg";
import { ReactComponent as AddIcon } from "./sources/add.svg";
import { ReactComponent as BackIcon } from "./sources/back.svg";
import { ReactComponent as ChatIcon } from "./sources/chat.svg";
import "../../styles/ui/ChatButton.scss";
import ChatBox from "./ChatBox";
import { webSocketService } from "components/views/WebSocketService";

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
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const initializeConnection = async () => {
      webSocketService.initializeWebSocket();

      const onMessageReceived = (message) => {
        const chatMessage = JSON.parse(message);
        setMessages((prevMessages) => {
          const isDuplicate = prevMessages.some(
            (msg) => msg.name === chatMessage.sender && msg.message === chatMessage.content
          );
          if (isDuplicate || chatMessage.sender === username) {
            return prevMessages;
          }
          return [...prevMessages, { name: chatMessage.sender, message: chatMessage.content }];
        });

        if (!isChatOpen && chatMessage.sender !== username) {
          setUnreadCount((prevCount) => prevCount + 1);
        }
      };

      await webSocketService.waitForConnection();
      webSocketService.subscribeChat(onMessageReceived).then(() => {
        setIsConnected(true);
      }).catch((error) => {
        console.error("Subscription error:", error);
      });
    };

    initializeConnection();

    return () => {
      webSocketService.disconnect();
    };
  }, [username]);

  const handleButtonClick = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setUnreadCount(0);
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleSendMessage = (newMessage) => {
    if (newMessage.trim() !== "" && isConnected) {
      const chatMessage = {
        sender: username,
        content: newMessage,
        type: "CHAT"
      };
      webSocketService.client.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { name: "You", message: newMessage }
      ]);
    } else if (!isConnected) {
      console.warn("Cannot send message: WebSocket is not connected.");
    }
  };

  const positionClass = 'bottom-left';

  return (
    <div className={`chat-btton-container ${width}-btton ${positionClass}`}>
      <button className="chat-btton" onClick={handleButtonClick}>
        <Icon className="chat-icon" />
        {notificationCount >= 0 && (
          <span className="notification-circle">{parseInt(unreadCount)}</span>
        )}
      </button>
      {isChatOpen && (
        <ChatBox
          className={isChatOpen ? 'open' : ''}
          onClose={handleCloseChat}
          messages={messages}
          onSendMessage={handleSendMessage}
          isConnected={isConnected}
        />
      )}
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