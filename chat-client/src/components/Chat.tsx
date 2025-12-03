// src/components/Chat.tsx
import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import type { User, Message } from "../types";
import "../chat.css";

interface ChatProps {
  user: User;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Emit user join event
    socket.emit("user_join", { name: user.name, avatar: user.avatar });

    const handleMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    const handleUsersUpdate = (users: User[]) => {
      setConnectedUsers(users);
    };

    socket.on("receive_message", handleMessage);
    socket.on("users_update", handleUsersUpdate);

    return () => {
      socket.off("receive_message", handleMessage);
      socket.off("users_update", handleUsersUpdate);
    };
  }, [user.name, user.avatar]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData: Message = {
      author: user.name,
      avatar: user.avatar,
      message: input,
    };

    socket.emit("send_message", messageData);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-main">
          <div className="messages-section">
            <div className="user-info">
              <img src={user.avatar} alt="avatar" width={50} height={50} />
              <span>{user.name}</span>
            </div>
            <div className="messages-box">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.author === user.name ? "user" : "other"
                  }`}
                >
                  <img
                    src={msg.avatar}
                    alt={msg.author}
                    width={30}
                    height={30}
                  />
                  <div>
                    <b>{msg.author}:</b> {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            <div className="input-box">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write a message... (will be translated to pirate speak 🏴‍☠️)"
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>

      <div className="users-sidebar">
        <h3>Pirates aboard ({connectedUsers.length})</h3>
        <div className="users-list">
          {connectedUsers.map((u, i) => (
            <div key={i} className="online-user">
              <img src={u.avatar} alt={u.name} width={40} height={40} />
              <span>{u.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Chat;
