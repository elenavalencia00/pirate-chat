// src/App.tsx
import React, { useState } from 'react';
import PreChat from './components/PreChat';
import Chat from './components/Chat';
import type { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div>
      <h1>Chat en tiempo real</h1>
      {!user ? (
        <PreChat onUserReady={setUser} />
      ) : (
        <Chat user={user} />
      )}
    </div>
  );
}

export default App;