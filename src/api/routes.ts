import { Express, Request, Response } from 'express';
import {
  createSession,
  getAllLobbies,
  createLobby
} from '../services/lobbyService';

export function setupRoutes(app: Express) {
  app.get('/', (req, res) => {
    res.send('BattleBridge API is running.');
  });

  app.post('/session', (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const player = createSession(name);
    res.json(player);
  });

  app.get('/lobbies', (req: Request, res: Response) => {
    const lobbies = getAllLobbies();
    res.json(lobbies);
  });

  app.post('/lobbies', (req: Request, res: Response) => {
    const { name, creatorId } = req.body;
    if (!name || !creatorId) {
      return res.status(400).json({ error: 'name and creatorId are required' });
    }

    const lobby = createLobby(name, creatorId);
    if (!lobby) return res.status(404).json({ error: 'Creator not found' });

    res.json(lobby);
  });
}
