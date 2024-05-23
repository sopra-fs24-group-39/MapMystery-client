import React, { useState, useEffect, useRef } from "react";
import "../../styles/ui/ChatButton.scss";
import { ReactComponent as CloseIcon } from "./sources/close.svg";
import { stringToColor } from "helpers/colorHash.js";

interface ChatBoxProps {
  className: string;
  onClose: () => void;
  messages: Array<{ name: string, message: string }>;
  onSendMessage: (message: string) => void;
  isConnected: boolean; // Add isConnected prop
}

const ChatBox: React.FC<ChatBoxProps> = ({ className, onClose, messages, onSendMessage, isConnected }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={`chat-box ${className}`}>
      <div className="chat-box-header">
        Chat
        <button className="chat-box-close" onClick={onClose}><CloseIcon className="chat-box-close-icon" /></button>
      </div>
      <div className="chat-box-messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong style={{ color: stringToColor(msg.name) }}>
              {msg.name === username ? "You" : msg.name}:
            </strong> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-box-input">
        {!isConnected ? (
          <div>Connecting to chat...</div>
        ) : (
          <>
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              disabled={!isConnected}
              maxLength={200}
            />
            <button onClick={handleSendMessage}>Send</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
