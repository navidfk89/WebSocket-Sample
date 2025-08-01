# 🕹️ BattleBridge Server

A cleanly architected, real-time multiplayer battle lobby backend built with **TypeScript**, **Express**, and **WebSocket**. Fully unit-tested with **Jest**, designed to work with a Unity frontend.

---

## ✨ Features

✅ Create players and lobbies  
✅ Join lobby and sync players  
✅ Real-time ready system via WebSocket  
✅ Turn-based battle system with alternating turns  
✅ Fully unit-tested service layer  
✅ Clean folder structure with service isolation  
✅ Designed for use with a Unity WebSocket client

---

## 🧠 Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Server        | Node.js + TypeScript |
| API           | Express.js         |
| Realtime Comm | WebSocket (ws)     |
| Testing       | Jest + ts-jest     |
| Client Ready  | Unity (WebSocket or NativeWebSocket) |

---

## 🗂️ Folder Structure

battlebridge-server/
├── src/
│ ├── api/ # REST endpoints
│ ├── models/ # Message & data interfaces
│ ├── services/ # Lobby & battle logic
│ ├── sockets/ # WebSocket server & handlers
│ ├── config.ts
│ ├── server.ts
│ └── index.ts
├── tests/ # Jest unit tests
├── jest.config.js
├── tsconfig.json
└── README.md


---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/battlebridge-server.git
cd battlebridge-server
npm install

Visit http://localhost:3000 to confirm.

npm run test

PASS  tests/lobbyService.test.ts
PASS  tests/battleService.test.ts

🔌 API Overview
REST Endpoints
Method	Endpoint	Description
POST	/session	Create a new player
GET	/lobbies	List lobbies
POST	/lobbies	Create new lobby

WebSocket Events
JOIN_LOBBY

PLAYER_READY

BATTLE_MOVE

Each player receives:

LOBBY_STATE

BATTLE_STATE

🧪 Example WebSocket Flow
json
Copy
Edit
// Player joins lobby
{
  "type": "JOIN_LOBBY",
  "playerId": "abc",
  "lobbyId": "123"
}

// Player ready
{
  "type": "PLAYER_READY",
  "playerId": "abc",
  "lobbyId": "123"
}

// Player makes move
{
  "type": "BATTLE_MOVE",
  "playerId": "abc",
  "lobbyId": "123",
  "move": "attack"
}