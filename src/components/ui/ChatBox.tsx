import React, { useState, useEffect, useRef } from "react";
import "../../styles/ui/ChatButton.scss";
import { ReactComponent as CloseIcon } from "./sources/close.svg";
import { stringToColor } from "helpers/colorHash.js";

interface ChatBoxProps {
  className: string;
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ className, onClose }) => {
  const [messages, setMessages] = useState([
    { name: "Testuser123", message: "Hello!" },
    { name: "username34", message: "Hi there!" },
    { name: "thisisauser", message: "should we play globeguesser?" },
    { name: "Testuser123", message: "sure" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { name: "You", message: newMessage }]);
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
            <strong style={{ color: stringToColor(msg.name) }}>{msg.name}:</strong> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-box-input">
        <input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
