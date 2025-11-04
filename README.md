# 🏴 Pirate Chat

**Pirate Chat** is a real-time chat application built with **React**, **TypeScript**, and **Node.js**.  
Every message is automatically translated into pirate language using the [Fun Translations Pirate API]((https://funtranslations.com/pirate)).

---

## 🧭 Overview

Pirate Chat connects a React frontend with an Express backend to demonstrate:
- Handling real-time chat updates  
- Communicating between client and server  
- Integrating external APIs for language translation  

Users write messages in plain English — and the app instantly returns them in pirate speak.

---

## ⚙️ Features

- Real-time chat between users  
- Automatic translation to pirate language  
- React + TypeScript frontend powered by Vite  
- Node.js + Express backend  
- Environment-based API configuration  

---

## 🧰 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React, TypeScript, Vite |
| **Backend** | Node.js, Express |
| **API** | Fun Translations Pirate API |
| **Dev Tools** | Concurrently (runs client + server together) |

---

## 🚀 Installation

Clone the repository:

```
git clone https://github.com/elenavalencia00/pirate-chat.git
cd pirate-chat
```
Install dependencies for both the client and the server:

```
npm install
cd client && npm install
cd ../server && npm install
```

Run both servers together:

```
cd ..
npm run dev
```

By default:

Frontend → http://localhost:5173

Backend → http://localhost:5000


🔐 Environment Variables

In the server directory, create a .env file:

```
API_URL=https://api.funtranslations.com/translate/pirate.json
PORT=5000
```

💬 Usage
Start the development servers.

Open the client in your browser.

Type a message in English — it will appear translated to pirate language.

Example:

Input	Output
Hello everyone, how are you today?	Ahoy mateys! How be ye this fine day?

🗂️ Project Structure

pirate-chat/
│
├── client/            # React + Vite frontend
│   ├── src/
│   └── package.json
│
├── server/            # Node + Express backend
│   ├── index.ts
│   └── package.json
│
├── package.json       # Runs both client and server
└── README.md
🪙 License
This project is open source under the MIT License.
