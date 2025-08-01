import {
  createSession,
  createLobby,
  addPlayerToLobby,
  getLobbyById,
  markPlayerReady
} from '../src/services/lobbyService';

describe('LobbyService', () => {
  let playerId1: string;
  let playerId2: string;
  let lobbyId: string;

  it('should create a player session', () => {
    const player = createSession('TestPlayer1');
    playerId1 = player.id;
    expect(player).toHaveProperty('id');
    expect(player.name).toBe('TestPlayer1');
  });

  it('should create a second player session', () => {
    const player = createSession('TestPlayer2');
    playerId2 = player.id;
    expect(player.name).toBe('TestPlayer2');
  });

  it('should create a lobby with the first player', () => {
    const lobby = createLobby('TestLobby', playerId1);
    expect(lobby).toBeDefined();
    expect(lobby?.players.length).toBe(1);
    lobbyId = lobby!.id;
  });

  it('should allow second player to join the lobby', () => {
    const success = addPlayerToLobby(lobbyId, playerId2);
    expect(success).toBe(true);

    const updatedLobby = getLobbyById(lobbyId)!;
    expect(updatedLobby.players.length).toBe(2);
  });

  it('should mark players as ready', () => {
    expect(markPlayerReady(lobbyId, playerId1)).toBe(true);
    expect(markPlayerReady(lobbyId, playerId2)).toBe(true);
  });
});
