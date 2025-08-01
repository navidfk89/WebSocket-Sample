import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { config } from './config';
import { setupRoutes } from './api/routes';
import { setupWebSocketHandlers } from './sockets/websocketHandlers';

export async function createServer() {
  const app = express();
  app.use(express.json());

  setupRoutes(app);

  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: config.WS_PATH });

  setupWebSocketHandlers(wss);

  return server;
}
