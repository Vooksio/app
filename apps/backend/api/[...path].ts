import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import healthRouter from '../routes/health';

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', healthRouter);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
  next();
});

// Handle all routes through this serverless function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Forward the request to Express
  return new Promise((resolve, reject) => {
    app(req, res, (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve(undefined);
    });
  });
}