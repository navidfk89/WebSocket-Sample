export interface Player {
  id: string;
  name: string;
  socketId?: string;
  isReady: boolean;
}

export interface Lobby {
  id: string;
  name: string;
  players: Player[];
  maxPlayers: number;
  isStarted: boolean;
}
