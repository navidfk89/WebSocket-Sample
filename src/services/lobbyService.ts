import { v4 as uuidv4 } from 'uuid';
import { Lobby, Player } from '../models/types';
import { config } from '../config';

const lobbies: Map<string, Lobby> = new Map();
const players: Map<string, Player> = new Map();

export function createSession(name: string): Player {
  const player: Player = {
    id: uuidv4(),
    name,
    isReady: false,
  };
  players.set(player.id, player);
  return player;
}

export function getAllLobbies(): Lobby[] {
  return Array.from(lobbies.values()).filter(lobby => !lobby.isStarted);
}

export function createLobby(lobbyName: string, creatorId: string): Lobby | null {
  const player = players.get(creatorId);
  if (!player) return null;

  const newLobby: Lobby = {
    id: uuidv4(),
    name: lobbyName,
    players: [player],
    maxPlayers: config.MAX_PLAYERS_PER_LOBBY,
    isStarted: false,
  };
  lobbies.set(newLobby.id, newLobby);
  return newLobby;
}

export function getPlayerById(id: string): Player | undefined {
  return players.get(id);
}

export function getLobbyById(id: string): Lobby | undefined {
  return lobbies.get(id);
}
export function addPlayerToLobby(lobbyId: string, playerId: string): boolean {
  const lobby = lobbies.get(lobbyId);
  const player = players.get(playerId);
  if (!lobby || !player) return false;

  const alreadyJoined = lobby.players.find(p => p.id === playerId);
  if (alreadyJoined) return true;

  if (lobby.players.length >= lobby.maxPlayers) return false;

  lobby.players.push(player);
  return true;
}

export function markPlayerReady(lobbyId: string, playerId: string): boolean {
  const lobby = lobbies.get(lobbyId);
  if (!lobby) return false;

  const player = lobby.players.find(p => p.id === playerId);
  if (!player) return false;

  player.isReady = true;
  return true;
}

export function getLobbyPlayers(lobbyId: string) {
  const lobby = lobbies.get(lobbyId);
  return lobby ? lobby.players : [];
}
