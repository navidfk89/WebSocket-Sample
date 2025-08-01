import {
  startBattle,
  submitMove,
  getBattleState
} from '../src/services/battleService';

describe('BattleService', () => {
  const lobbyId = 'test-lobby-001';
  const player1 = 'player-a';
  const player2 = 'player-b';

  it('should start a battle and set first turn', () => {
    startBattle(lobbyId, [player1, player2]);

    const battle = getBattleState(lobbyId);
    expect(battle).toBeDefined();
    expect([player1, player2]).toContain(battle?.currentTurnPlayerId);
  });

  it('should accept a valid move and switch turn', () => {
    const success = submitMove(lobbyId, player1, 'attack');
    expect(success).toBe(true);

    const battle = getBattleState(lobbyId)!;
    expect(battle.moveHistory.length).toBe(1);
    expect(battle.moveHistory[0].move).toBe('attack');
    expect(battle.currentTurnPlayerId).toBe(player2);
  });

  it('should reject a move if it is not the player’s turn', () => {
    const failed = submitMove(lobbyId, player1, 'attack'); // player1 just moved
    expect(failed).toBe(false);
  });

  it('should allow the second player to make their move', () => {
    const success = submitMove(lobbyId, player2, 'defend');
    expect(success).toBe(true);

    const battle = getBattleState(lobbyId)!;
    expect(battle.moveHistory.length).toBe(2);
    expect(battle.moveHistory[1].move).toBe('defend');
    expect(battle.currentTurnPlayerId).toBe(player1);
  });
});
