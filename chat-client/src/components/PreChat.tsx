// src/components/PreChat.tsx
import React, { useState } from "react";
import "../prechat.css";
import type { User } from "../types";

const profileOptions = ["/1.PNG", "/2.PNG", "/3.PNG", "/4.PNG", "/5.PNG"];

interface PreChatProps {
  onUserReady: (user: User) => void;
}

const PreChat: React.FC<PreChatProps> = ({ onUserReady }) => {
  const [name, setName] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleStart = () => {
    if (name && selectedProfile) {
      onUserReady({ name, avatar: selectedProfile });
    }
  };

  return (
    <div className="prechat-container">
      <h1 className="pirate-title">🏴‍☠️ Welcome Aboard! 🏴‍☠️</h1>
      <h2>Choose your pirate name and avatar</h2>
      <input
        type="text"
        placeholder="Your pirate name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={20}
      />
      <div className="profiles">
        {profileOptions.map((profile) => (
          <img
            key={profile}
            src={profile}
            alt="avatar"
            className={selectedProfile === profile ? "selected" : ""}
            onClick={() => setSelectedProfile(profile)}
          />
        ))}
      </div>
      <button disabled={!name.trim() || !selectedProfile} onClick={handleStart}>
        ⚓ Set Sail to Chat! ⚓
      </button>
    </div>
  );
};

export default PreChat;
