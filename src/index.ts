import { createServer } from './server';

const start = async () => {
  try {
    const server = await createServer();
    server.listen(3000, () => {
      console.log(`🚀 Server listening on http://localhost:3000`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

start();
