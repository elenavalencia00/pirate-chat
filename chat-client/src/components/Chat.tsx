// src/components/Chat.tsx
import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import type { User, Message } from "../types";
import '../chat.css';

interface ChatProps {
  user: User;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleMessage = (data: Message) => {
      setMessages(prev => [...prev, data]);
    };

    socket.on("receive_message", handleMessage);
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const messageData: Message = { 
      author: user.name, 
      avatar: user.avatar,
      message: input
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
    <div className="chat-container">
      <div className="user-info">
        <img src={user.avatar} alt="avatar" width={50} height={50} />
        <span>{user.name}</span>
        <span className="pirate-badge">🏴‍☠️ Modo Pirata</span>
      </div>

      <div className="messages-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.author === user.name ? "user" : "other"}`}>
            <img src={msg.avatar} alt={msg.author} width={30} height={30} />
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
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje... (se traducirá a pirata 🏴‍☠️)"
        />
        <button onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;