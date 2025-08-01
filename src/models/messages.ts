// ==== CLIENT → SERVER MESSAGES ====

export type ClientMessage =
  | JoinLobbyMessage
  | ReadyMessage
  | BattleMoveMessage;

export interface JoinLobbyMessage {
  type: 'JOIN_LOBBY';
  playerId: string;
  lobbyId: string;
}

export interface ReadyMessage {
  type: 'PLAYER_READY';
  playerId: string;
  lobbyId: string;
}

export interface BattleMoveMessage {
  type: 'BATTLE_MOVE';
  playerId: string;
  lobbyId: string;
  move: string;
}

// ==== SERVER → CLIENT MESSAGES ====

export type ServerMessage =
  | LobbyStateMessage
  | BattleStateMessage;

export interface LobbyStateMessage {
  type: 'LOBBY_STATE';
  lobbyId: string;
  players: {
    id: string;
    name: string;
    isReady: boolean;
  }[];
}

export interface BattleStateMessage {
  type: 'BATTLE_STATE';
  lobbyId: string;
  currentTurnPlayerId: string;
  moveHistory: {
    playerId: string;
    move: string;
  }[];
}
