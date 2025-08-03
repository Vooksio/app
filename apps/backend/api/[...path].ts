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
  await new Promise<void>((resolve, reject) => {
    // Convert Vercel's req/res to Express-compatible objects
    const expressReq = Object.assign(req, {
      get: (header: string) => req.headers[header],
      header: (header: string) => req.headers[header],
      accepts: () => true,
      acceptsCharsets: () => true,
      acceptsEncodings: () => true,
      acceptsLanguages: () => true,
      range: () => undefined,
      param: () => undefined,
      is: () => false,
    });

    const expressRes = Object.assign(res, {
      header: (key: string, value: string) => res.setHeader(key, value),
    });

    app(expressReq as any, expressRes as any, (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}