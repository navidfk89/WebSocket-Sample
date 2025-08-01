import { WebSocketServer, WebSocket } from 'ws';
import {
  addPlayerToLobby,
  getLobbyPlayers,
  markPlayerReady
} from '../services/lobbyService';
import {
  startBattle,
  submitMove,
  getBattleState
} from '../services/battleService';

import {
  ClientMessage,
  LobbyStateMessage,
  BattleStateMessage
} from '../models/messages';

type LobbyConnections = Map<string, Set<WebSocket>>;
const lobbyConnections: LobbyConnections = new Map();

function broadcastLobbyState(lobbyId: string) {
  const players = getLobbyPlayers(lobbyId);
  const message: LobbyStateMessage = {
    type: 'LOBBY_STATE',
    lobbyId,
    players: players.map(p => ({
      id: p.id,
      name: p.name,
      isReady: p.isReady,
    }))
  };

  const connections = lobbyConnections.get(lobbyId);
  if (connections) {
    const json = JSON.stringify(message);
    connections.forEach(ws => {
      ws.send(json);
    });
  }
}

function broadcastBattleState(lobbyId: string) {
  const battle = getBattleState(lobbyId);
  if (!battle) return;

  const message: BattleStateMessage = {
    type: 'BATTLE_STATE',
    lobbyId: battle.lobbyId,
    currentTurnPlayerId: battle.currentTurnPlayerId,
    moveHistory: battle.moveHistory
  };

  const json = JSON.stringify(message);
  const connections = lobbyConnections.get(lobbyId);
  connections?.forEach(ws => ws.send(json));
}

export function setupWebSocketHandlers(wss: WebSocketServer) {
  wss.on('connection', (socket) => {
    console.log('🟢 WebSocket connected');

    socket.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString()) as ClientMessage;

        switch (msg.type) {
          case 'JOIN_LOBBY':
            if (addPlayerToLobby(msg.lobbyId, msg.playerId)) {
              if (!lobbyConnections.has(msg.lobbyId)) {
                lobbyConnections.set(msg.lobbyId, new Set());
              }
              lobbyConnections.get(msg.lobbyId)!.add(socket);
              broadcastLobbyState(msg.lobbyId);
            }
            break;

          case 'PLAYER_READY':
            if (markPlayerReady(msg.lobbyId, msg.playerId)) {
              broadcastLobbyState(msg.lobbyId);

              const allReady = getLobbyPlayers(msg.lobbyId).every(p => p.isReady);
              if (allReady) {
                const players = getLobbyPlayers(msg.lobbyId);
                startBattle(msg.lobbyId, players.map(p => p.id));
                broadcastBattleState(msg.lobbyId);
              }
            }
            break;

          case 'BATTLE_MOVE':
            if (submitMove(msg.lobbyId, msg.playerId, msg.move)) {
              broadcastBattleState(msg.lobbyId);
            }
            break;
        }
      } catch (err) {
        console.error('❌ Failed to process message:', err);
      }
    });

    socket.on('close', () => {
      console.log('🔴 WebSocket disconnected');
      // Optional: cleanup from lobbyConnections here
    });
  });
}
