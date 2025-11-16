import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { UPLOADS_DIR } from './config/paths';
import routes from './routes';

const app = express();

app.use(
  cors({
    origin: '*'
  })
);

app.use(express.json());

// Ensure uploads directory exists and serve it statically
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('Could not create uploads directory', err);
}

app.use('/uploads', express.static(UPLOADS_DIR));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Comet Ring API' });
});

app.use('/api', routes);

export default app;

