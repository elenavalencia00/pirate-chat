// src/components/PreChat.tsx
import React, { useState } from 'react';
import '../prechat.css';
import type { User } from '../types';

const profileOptions = [
  '/profiles/avatar1.png',
  '/profiles/avatar2.png',
  '/profiles/avatar3.png',
  '/profiles/avatar4.png',
  '/profiles/avatar5.png',
];

interface PreChatProps {
  onUserReady: (user: User) => void;
}

const PreChat: React.FC<PreChatProps> = ({ onUserReady }) => {
  const [name, setName] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleStart = () => {
    if (name && selectedProfile) {
      onUserReady({ name, avatar: selectedProfile });
    }
  };

  return (
    <div className="prechat-container">
      <h2>Elige tu nombre y perfil</h2>
      <input
        type="text"
        placeholder="Tu nombre"
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
            className={selectedProfile === profile ? 'selected' : ''}
            onClick={() => setSelectedProfile(profile)}
          />
        ))}
      </div>
      <button
        disabled={!name.trim() || !selectedProfile}
        onClick={handleStart}
      >
        Entrar al chat
      </button>
    </div>
  );
};

export default PreChat;