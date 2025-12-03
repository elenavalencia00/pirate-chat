# Pirate Chat

A real-time chat application where verything you type in English is automatically translated to pirate language using the [Fun Translations Pirate API](https://funtranslations.com/api/pirate). You can try it live [here](https://pirate-chat.vercel.app/).

## Features

- Real-time chat between multiple users
- Messages are translated to pirate speak using Fun Translations Pirate API
- Choose your username and avatar
- See a list of connected users

## Technologies Used

- React
- TypeScript
- Vite
- Node.js
- Express
- Socket.io
- Fun Translations Pirate API

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/elenavalencia00/pirate-chat-vercel.git
   cd pirate-chat-vercel
   ```

2. Install dependencies for both client and server:
   ```
   cd chat-server
   npm install
   cd ../chat-client
   npm install
   cd ..
   ```

### Running Locally

Open two terminals:

**Terminal 1: Start the server**
```
cd chat-server
npm run dev
```

**Terminal 2: Start the client**
```
cd chat-client
npm run dev
```

- The client will be available at `http://localhost:5173`
- The server will run at `http://localhost:3001`

### Deployment

- The frontend can be deployed on Vercel or Netlify (set the root directory to `chat-client`).
- The backend can be deployed on Render, Railway, or similar (set the root directory to `chat-server`).

Update the client socket connection URL in `chat-client/src/socket.ts` to point to your deployed backend.

## License

MIT
