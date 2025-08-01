interface BattleState {
  lobbyId: string;
  playerIds: [string, string]; // 🔥 needed to alternate turn
  currentTurnPlayerId: string;
  moveHistory: { playerId: string; move: string }[];
}

const battles = new Map<string, BattleState>();

export function startBattle(lobbyId: string, playerIds: string[]) {
  if (playerIds.length !== 2) return;

  const battle: BattleState = {
    lobbyId,
    playerIds: [playerIds[0], playerIds[1]],
    currentTurnPlayerId: playerIds[0],
    moveHistory: []
  };

  battles.set(lobbyId, battle);
}

export function getBattleState(lobbyId: string): BattleState | undefined {
  return battles.get(lobbyId);
}

export function submitMove(lobbyId: string, playerId: string, move: string): boolean {
  const battle = battles.get(lobbyId);
  if (!battle || battle.currentTurnPlayerId !== playerId) return false;

  battle.moveHistory.push({ playerId, move });

  // Flip turn to the other player
  const [p1, p2] = battle.playerIds;
  battle.currentTurnPlayerId = playerId === p1 ? p2 : p1;

  return true;
}
